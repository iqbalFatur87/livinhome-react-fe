import { Button, Center, HStack, Image, Input, Select, Stack, Text, useToast } from "@chakra-ui/react";
import { customBorder, inputBackgroundColor, inputColor, primaryTextColor } from "../../../components/theme";
import { MdOutlineNotificationsActive } from "react-icons/md";
import { useEffect, useState } from "react";
import LoadingComponent from "../../../components/LoadingComponent";
import axios from "axios";
import { BASE_API } from "../../../utils/constant/api";
import { authorityCheck, AUTHORIZATION_HEADERS } from "../../../utils/helper/helper";
import ModalUpdatePhotoProfil from "./components/ModalUpdatePhotoProfil";

const index = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [dataState, setDataState] = useState<any>(null);
  const [initDataState, setInitDataState] = useState<any>(null);
  const [listKota, setListKota] = useState<any>([]);
  const [modalPhotoProfil, setModalPhotoProfil] = useState<boolean>(false);
  const toast = useToast();
  const getData = async () => {
    setLoading(true);
    try {
      await axios.get(`${BASE_API}/profile/owner`, AUTHORIZATION_HEADERS).then((res) => {
        setInitDataState(res.data.data);
        setDataState(res.data.data);
      });
    } catch (error) {
      setDataState(null);
    }

    setLoading(false);
  };
  const updateForm = (field: string, newValue: any) => {
    setDataState((prev: any) => ({ ...prev, [field]: newValue }));
  };
  const getlistKota = async () => {
    setLoading(true);
    setListKota([]);
    await axios.get("/indonesia.json").then((res) => {
      const tmp = [];
      for (const i of res.data) {
        for (const j of i.listKota) {
          let dataToPush = j.name
            .replace(/KABUPATEN\s+/i, "")
            .replace(/KOTA\s+/i, "")
            .trim();
          tmp.push(dataToPush);
        }
      }
      setListKota(tmp);
      setTimeout(() => {
        setLoading(false);
      }, 100);
    });
  };

  const submit = async () => {
    setLoading(true);
    let dataToPost = dataState;
    dataToPost.date_of_birth = new Date(dataToPost.date_of_birth).getTime();
    await axios
      .post(`${BASE_API}/profile/owner/update`, dataToPost, AUTHORIZATION_HEADERS)
      .then(() => {
        toast({
          description: "Berhasil update profil",
          status: "success",
          variant: "subtle",
          duration: 9000,
          isClosable: true,
        });
        getData();
      })
      .catch((error) => {
        authorityCheck(error.response.status);
        toast({
          description: error.response.data.meta.message.join(", "),
          status: "error",
          variant: "subtle",
          duration: 9000,
          isClosable: true,
        });
        setLoading(false);
      });
    setLoading(false);
  };
  useEffect(() => {
    getlistKota();
    getData();
  }, []);
  return loading ? (
    <LoadingComponent />
  ) : (
    <Center>
      {/* <pre>{JSON.stringify(dataState, null, 2)}</pre> */}
      <Stack width={"100%"} maxWidth={"500px"} gap={"20px"}>
        <Stack
          alignSelf={"center"}
          alignItems={"center"}
          justifyContent={"center"}
          cursor={"pointer"}
          gap={"0"}
          onClick={() => setModalPhotoProfil(true)}
        >
          <Image src="/avatar.png" width={"100px"} height={"100px"} objectFit={"contain"} />
          <Text fontWeight={"bold"} fontSize={"xs"} as={"u"}>
            Ubah Foto
          </Text>
        </Stack>

        <HStack
          justifyContent={"center"}
          backgroundColor={"rgba(0, 0, 0, 0.1)"}
          flexWrap={"wrap"}
          borderRadius={"8px"}
          padding={"16px 32px 16px 32px"}
          fontSize={"sm"}
        >
          <MdOutlineNotificationsActive style={{ fontWeight: "bold", fontSize: "20px" }} />
          <Text>Mohon lengkapi data dokumen kamu.</Text>
          <Text fontWeight={"bold"} as={"u"}>
            Lengkapi Sekarang
          </Text>
        </HStack>
        <Stack>
          <HStack flexWrap={"wrap"}>
            <Text color={primaryTextColor()} fontWeight={"bold"}>
              Nama Lengkap
            </Text>
          </HStack>

          <Input
            value={dataState?.fullname || ""}
            onChange={(e) => updateForm("fullname", e.target.value)}
            backgroundColor={inputBackgroundColor()}
            border={customBorder()}
            color={inputColor()}
          />
        </Stack>
        <Stack>
          <HStack flexWrap={"wrap"}>
            <Text color={primaryTextColor()} fontWeight={"bold"}>
              Email
            </Text>
          </HStack>

          <Input
            value={dataState?.email || ""}
            onChange={(e) => updateForm("email", e.target.value)}
            backgroundColor={inputBackgroundColor()}
            border={customBorder()}
            color={inputColor()}
          />
        </Stack>
        <Stack>
          <Text color={primaryTextColor()} fontWeight={"bold"}>
            Jenis Kelamin
          </Text>
          <Select
            value={dataState?.gender || ""}
            onChange={(e) => updateForm("gender", e.target.value)}
            backgroundColor={inputBackgroundColor()}
            border={customBorder()}
            color={inputColor()}
          >
            <option>Pilih Jenis Kelamin</option>
            <option value={1}>Laki-Laki</option>
            <option value={0}>Perempuan</option>
          </Select>
        </Stack>
        <Stack>
          <HStack flexWrap={"wrap"}>
            <Text color={primaryTextColor()} fontWeight={"bold"}>
              Tanggal Lahir
            </Text>
          </HStack>

          <Input
            value={dataState?.date_of_birth || ""}
            onChange={(e) => updateForm("date_of_birth", e.target.value)}
            type="date"
            backgroundColor={inputBackgroundColor()}
            border={customBorder()}
            color={inputColor()}
          />
        </Stack>
        <Stack>
          <HStack flexWrap={"wrap"}>
            <Text color={primaryTextColor()} fontWeight={"bold"}>
              No Handphone
            </Text>
          </HStack>

          <Input
            value={dataState?.phone_number || ""}
            onChange={(e) => updateForm("phone_number", e.target.value)}
            backgroundColor={inputBackgroundColor()}
            border={customBorder()}
            color={inputColor()}
          />
        </Stack>
        <Stack>
          <Text color={primaryTextColor()} fontWeight={"bold"}>
            Pekerjaan
          </Text>
          <Select
            value={dataState?.job || ""}
            onChange={(e) => updateForm("job", e.target.value)}
            backgroundColor={inputBackgroundColor()}
            border={customBorder()}
            color={inputColor()}
          >
            <option>Pilih Pekerjaan</option>
            <option value={"Mahasiswa"}>Mahasiswa</option>
            <option value={"PNS"}>PNS</option>
            <option value={"Swasta"}>Swasta</option>
            <option value={"Wira Usaha"}>Wira Usaha</option>
          </Select>
        </Stack>
        <Stack>
          <HStack flexWrap={"wrap"}>
            <Text color={primaryTextColor()} fontWeight={"bold"}>
              Nama Sekolah
            </Text>
          </HStack>

          <Input
            value={dataState?.school_name || ""}
            onChange={(e) => updateForm("school_name", e.target.value)}
            backgroundColor={inputBackgroundColor()}
            border={customBorder()}
            color={inputColor()}
          />
        </Stack>
        <Stack>
          <Text color={primaryTextColor()} fontWeight={"bold"}>
            Kota Asal
          </Text>
          <Select
            value={dataState?.city || ""}
            onChange={(e) => updateForm("city", e.target.value)}
            backgroundColor={inputBackgroundColor()}
            border={customBorder()}
            color={inputColor()}
          >
            <option>Pilih</option>
            {listKota.map((i: string) => (
              <option value={i} key={i}>
                {i}
              </option>
            ))}
          </Select>
        </Stack>
        <Stack>
          <Text color={primaryTextColor()} fontWeight={"bold"}>
            Status
          </Text>
          <Select
            value={dataState?.status || ""}
            onChange={(e) => updateForm("status", e.target.value)}
            backgroundColor={inputBackgroundColor()}
            border={customBorder()}
            color={inputColor()}
          >
            <option>Pilih Status</option>
            <option value={"kawin"}>Kawin</option>
            <option value={"Belum Kawin"}>Belum Kawin</option>
            <option value={"Cerai"}>Cerai</option>
          </Select>
        </Stack>
        <Stack>
          <Text color={primaryTextColor()} fontWeight={"bold"}>
            Pendidikan Terakhir
          </Text>
          <Select
            value={dataState?.last_education || ""}
            onChange={(e) => updateForm("last_education", e.target.value)}
            backgroundColor={inputBackgroundColor()}
            border={customBorder()}
            color={inputColor()}
          >
            <option>Pilih Pendidikan</option>
            <option value={"SMA"}>SMA</option>
            <option value={"S1"}>S1</option>
            <option value={"S2"}>S2</option>
            <option value={"S3"}>S3</option>
          </Select>
        </Stack>

        <Stack>
          <Text color={primaryTextColor()} fontWeight={"bold"}>
            Bank
          </Text>
          <Select
            value={dataState?.bank || ""}
            onChange={(e) => updateForm("bank", e.target.value)}
            backgroundColor={inputBackgroundColor()}
            border={customBorder()}
            color={inputColor()}
          >
            <option>Pilih Bank</option>
            <option value={"bca"}>Bank Central Asia (BCA)</option>
            <option value={"bni"}>Bank Negara Indonesia (BNI)</option>
            <option value={"bri"}>Bank Rakyat Indonesia (BRI)</option>
            <option value={"bsi"}>Bank Syariah Indonesia (BSI)</option>
            <option value={"mandiri"}>Mandiri</option>
          </Select>
        </Stack>

        <Stack>
          <HStack flexWrap={"wrap"}>
            <Text color={primaryTextColor()} fontWeight={"bold"}>
              Rekening
            </Text>
          </HStack>

          <Input
            value={dataState?.rekening || ""}
            // onChange={(e) => updateForm("rekening", e.target.value)}
            onChange={(e) => {
              if (!isNaN(Number(e.target.value))) {
                updateForm("rekening", Number(e.target.value));
              }
            }}
            backgroundColor={inputBackgroundColor()}
            border={customBorder()}
            color={inputColor()}
          />
        </Stack>

        <Stack>
          <HStack flexWrap={"wrap"}>
            <Text color={primaryTextColor()} fontWeight={"bold"}>
              No Kontak Darurat
            </Text>
          </HStack>

          <Input
            value={dataState?.emergency_contact || ""}
            onChange={(e) => updateForm("emergency_contact", e.target.value)}
            backgroundColor={inputBackgroundColor()}
            border={customBorder()}
            color={inputColor()}
          />
        </Stack>
        <Image src={dataState?.id_card} />

        <HStack justifyContent={"center"}>
          <Button onClick={() => setDataState(initDataState)}>Batal</Button>
          <Button colorScheme="yellow" onClick={submit}>
            Simpan
          </Button>
        </HStack>
      </Stack>

      {modalPhotoProfil ? (
        <ModalUpdatePhotoProfil
          onClose={() => {
            setModalPhotoProfil(false);
          }}
        />
      ) : null}
    </Center>
  );
};

export default index;
