import { Checkbox, HStack, Input, InputGroup, InputRightElement, Radio, RadioGroup, Select, Stack, Text } from "@chakra-ui/react";
import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import Dropzone from "./Dropzone";
import { BASE_API } from "../../../../utils/constant/api";
import { AUTHORIZATION_HEADERS } from "../../../../utils/constant/localStorage";
import { authorityCheck } from "../../../../utils/helper/helper";
import {
  customBorder,
  inputBackgroundColor,
  inputColor,
  primaryTextColor,
  primaryTextTitleColor,
  secondaryTextColor,
} from "../../../../components/theme";

function sliceArray(arr: any, length: number) {
  return arr.slice(0, length);
}

const FasilitasProperti = (props: { dataState: any; setDataState: any }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [listFacility, setListFacility] = useState<any>(null);

  const getListFacility = async () => {
    await axios
      .get(`${BASE_API}/property/get-facilities`, AUTHORIZATION_HEADERS)
      .then((res) => setListFacility(res.data.data))
      .catch((error) => {
        authorityCheck(error.response.status);
      });
  };

  useEffect(() => {
    getListFacility();
  }, []);

  useEffect(() => {
    // Initialize foto_kamar_tidur based on total_kamar
    if (props.dataState?.total_kamar) {
      if (!props.dataState?.foto_kamar_tidur || props.dataState?.foto_kamar_tidur.length == 0) {
        props.setDataState((prev: any) => ({
          ...prev,
          foto_kamar_tidur: Array(props.dataState.total_kamar).fill(""),
        }));
      } else if (props.dataState?.foto_kamar_tidur.length > props.dataState?.total_kamar) {
        props.setDataState((prev: any) => ({
          ...prev,
          foto_kamar_tidur: sliceArray(props.dataState?.foto_kamar_tidur, props.dataState?.total_kamar),
        }));
      } else if (props.dataState?.foto_kamar_tidur.length < props.dataState?.total_kamar) {
        for (let index = 0; index < props.dataState?.total_kamar - props.dataState?.foto_kamar_tidur.length; index++) {
          try {
            props.setDataState((prev: any) => ({
              ...prev,
              foto_kamar_tidur: [...prev?.foto_kamar_tidur, ""],
            }));
          } catch (error) {}
        }
      }
    }
  }, [props.dataState?.total_kamar]);

  const onDrop = useCallback(
    (acceptedFiles: File[], index: number) => {
      setLoading(true);

      if (acceptedFiles.length === 0) return;

      const file = acceptedFiles[0];
      const reader = new FileReader();

      reader.onloadend = () => {
        const imageUrl = reader.result as string;

        props.setDataState((prev: any) => {
          const updatedfoto_kamar_tidur = [...prev.foto_kamar_tidur];
          updatedfoto_kamar_tidur[index] = imageUrl;
          return { ...prev, foto_kamar_tidur: updatedfoto_kamar_tidur };
        });

        setLoading(false);
      };

      reader.readAsDataURL(file);
    },
    [props.setDataState]
  );

  return (
    <Stack gap={"25px"}>
      <Text fontWeight={"bold"} color={primaryTextColor()} textAlign={"center"} fontSize={"xl"}>
        Lengkapi Informasi Fasilitas di Properti Kamu
      </Text>

      <Stack>
        <Text color={primaryTextColor()} fontWeight={"bold"}>
          Fasilitas Properti
        </Text>
        <HStack flexWrap={"wrap"}>
          <Text color={primaryTextColor()}>Fasilitas Rumah</Text>
          <Text color={primaryTextTitleColor()}>*pilih salah satu</Text>
        </HStack>
        <RadioGroup value={props.dataState?.fasilitas} onChange={(e) => props.setDataState((prev: any) => ({ ...prev, fasilitas: e }))}>
          <Stack direction="row">
            <Radio colorScheme="yellow" value="kosongan">
              Kosongan
            </Radio>
            <Radio colorScheme="yellow" value="semi-furnised">
              Semi Furnised
            </Radio>
            <Radio colorScheme="yellow" value="furnised">
              Furnised
            </Radio>
          </Stack>
        </RadioGroup>
      </Stack>
      <Stack>
        <HStack flexWrap={"wrap"}>
          <Text color={primaryTextColor()}>Luas Tanah</Text>
          <Text color={primaryTextTitleColor()}>*Wajib diisi</Text>
        </HStack>
        <InputGroup backgroundColor={inputBackgroundColor()} border={customBorder()} color={inputColor()}>
          <Input
            value={props.dataState?.lebar_tanah}
            onChange={(e) => {
              if (!isNaN(Number(e.target.value))) {
                props.setDataState((prev: any) => ({ ...prev, lebar_tanah: Number(e.target.value) }));
              }
            }}
          />
          <InputRightElement width="4.5rem">
            <Text color={secondaryTextColor()}>m2</Text>
          </InputRightElement>
        </InputGroup>
      </Stack>

      <Stack>
        <HStack flexWrap={"wrap"}>
          <Text color={primaryTextColor()}>Daya Listrik</Text>
          <Text color={primaryTextTitleColor()}>*Wajib diisi</Text>
        </HStack>
        <InputGroup backgroundColor={inputBackgroundColor()} border={customBorder()} color={inputColor()}>
          <Input
            value={props.dataState?.daya_listrik}
            onChange={(e) => {
              if (!isNaN(Number(e.target.value))) {
                props.setDataState((prev: any) => ({ ...prev, daya_listrik: Number(e.target.value) }));
              }
            }}
          />
          <InputRightElement width="4.5rem">
            <Text color={secondaryTextColor()}>watt</Text>
          </InputRightElement>
        </InputGroup>
      </Stack>

      <Stack>
        <HStack flexWrap={"wrap"}>
          <Text color={primaryTextColor()}>Sumber Air</Text>
          <Text color={primaryTextTitleColor()}>*Wajib diisi</Text>
        </HStack>
        <Select
          backgroundColor={inputBackgroundColor()}
          border={customBorder()}
          color={inputColor()}
          value={props.dataState?.sumber_air}
          onChange={(e) => props.setDataState((prev: any) => ({ ...prev, sumber_air: e.target.value }))}
        >
          <option>Pilih</option>
          <option value="true">PDAM</option>
          <option value="false">Sumur</option>
        </Select>
      </Stack>

      <Stack>
        <Text color={primaryTextColor()} fontWeight={"bold"} marginTop={"20px"}>
          Kamar Tidur
        </Text>
        <HStack flexWrap={"wrap"}>
          <Text color={primaryTextColor()}>Jumlah Kamar Tidur</Text>
          <Text color={primaryTextTitleColor()}>*Wajib diisi</Text>
        </HStack>
        <Input
          value={props.dataState?.total_kamar}
          onChange={(e) => {
            if (!isNaN(Number(e.target.value))) {
              props.setDataState((prev: any) => ({ ...prev, total_kamar: Number(e.target.value) }));
            }
          }}
          backgroundColor={inputBackgroundColor()}
          border={customBorder()}
          color={inputColor()}
        />
      </Stack>
      {props.dataState.total_kamar &&
        props.dataState.foto_kamar_tidur &&
        props.dataState.foto_kamar_tidur.map((image: any, index: number) => (
          <Stack key={index}>
            <Text color={primaryTextColor()}>Kamar Tidur {index + 1}</Text>
            <Dropzone loading={loading} image={image} index={index} onDrop={onDrop} />
          </Stack>
        ))}

      <Stack>
        <Text color={primaryTextColor()} fontWeight={"bold"} marginTop={"20px"}>
          Lemari
        </Text>
        <HStack flexWrap={"wrap"}>
          <Text color={primaryTextColor()}>Lemari</Text>
          <Text color={primaryTextTitleColor()}>*Wajib diisi</Text>
        </HStack>
        <Input
          value={props.dataState?.total_lemari}
          onChange={(e) => {
            if (!isNaN(Number(e.target.value))) {
              props.setDataState((prev: any) => ({ ...prev, total_lemari: Number(e.target.value) }));
            }
          }}
          backgroundColor={inputBackgroundColor()}
          border={customBorder()}
          color={inputColor()}
        />
      </Stack>

      <Stack>
        <Text color={primaryTextColor()} fontWeight={"bold"} marginTop={"20px"}>
          Meja
        </Text>
        <HStack flexWrap={"wrap"}>
          <Text color={primaryTextColor()}>Meja</Text>
          <Text color={primaryTextTitleColor()}>*Wajib diisi</Text>
        </HStack>
        <Input
          value={props.dataState?.meja}
          onChange={(e) => {
            if (!isNaN(Number(e.target.value))) {
              props.setDataState((prev: any) => ({ ...prev, meja: Number(e.target.value) }));
            }
          }}
          backgroundColor={inputBackgroundColor()}
          border={customBorder()}
          color={inputColor()}
        />
      </Stack>

      <Stack>
        <Text color={primaryTextColor()} fontWeight={"bold"} marginTop={"20px"}>
          Kasur
        </Text>
        <HStack flexWrap={"wrap"}>
          <Text color={primaryTextColor()}>Kasur</Text>
          <Text color={primaryTextTitleColor()}>*Wajib diisi</Text>
        </HStack>
        <Input
          value={props.dataState?.kasur}
          onChange={(e) => {
            if (!isNaN(Number(e.target.value))) {
              props.setDataState((prev: any) => ({ ...prev, kasur: Number(e.target.value) }));
            }
          }}
          backgroundColor={inputBackgroundColor()}
          border={customBorder()}
          color={inputColor()}
        />
      </Stack>

      <Stack>
        <Text color={primaryTextColor()} fontWeight={"bold"} marginTop={"20px"}>
          Kapasitas Motor
        </Text>
        <HStack flexWrap={"wrap"}>
          <Text color={primaryTextColor()}>Jumlah Kapasitas Motor</Text>
          <Text color={primaryTextTitleColor()}>*Wajib diisi</Text>
        </HStack>
        <Input
          value={props.dataState?.kapasitas_motor}
          onChange={(e) => {
            if (!isNaN(Number(e.target.value))) {
              props.setDataState((prev: any) => ({ ...prev, kapasitas_motor: Number(e.target.value) }));
            }
          }}
          backgroundColor={inputBackgroundColor()}
          border={customBorder()}
          color={inputColor()}
        />
      </Stack>

      <Stack>
        <Text color={primaryTextColor()} fontWeight={"bold"} marginTop={"20px"}>
          Kapasitas Mobil
        </Text>
        <HStack flexWrap={"wrap"}>
          <Text color={primaryTextColor()}>Jumlah Kapasitas Mobil</Text>
          <Text color={primaryTextTitleColor()}>*Wajib diisi</Text>
        </HStack>
        <Input
          value={props.dataState?.kapasitas_mobil}
          onChange={(e) => {
            if (!isNaN(Number(e.target.value))) {
              props.setDataState((prev: any) => ({ ...prev, kapasitas_mobil: Number(e.target.value) }));
            }
          }}
          backgroundColor={inputBackgroundColor()}
          border={customBorder()}
          color={inputColor()}
        />
      </Stack>

      {listFacility ? (
        <Stack>
          <Text color={primaryTextColor()} fontWeight={"bold"} marginTop={"20px"}>
            Fasilitas Lainnya
          </Text>
          <Stack marginLeft={{ base: "8px", md: "20px" }}>
            {listFacility.map((i: any, index: number) => (
              <Checkbox
                key={index}
                colorScheme="yellow"
                isChecked={props.dataState?.fasilitas_lain?.includes(i.id) || false}
                onChange={(e) => {
                  const isChecked = e.target.checked;
                  const currentFacilities = props.dataState?.fasilitas_lain || [];

                  if (isChecked) {
                    props.setDataState((prev: any) => ({
                      ...prev,
                      fasilitas_lain: [...new Set([...currentFacilities, i.id])],
                    }));
                  } else {
                    props.setDataState((prev: any) => ({
                      ...prev,
                      fasilitas_lain: currentFacilities.filter((id: any) => id !== i.id),
                    }));
                  }
                }}
              >
                {i.name}
              </Checkbox>
            ))}
          </Stack>
        </Stack>
      ) : null}
    </Stack>
  );
};

export default FasilitasProperti;
