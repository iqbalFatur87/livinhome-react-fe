import { Badge, Button, HStack, Image, Input, InputGroup, InputRightElement, Stack, Text } from "@chakra-ui/react";
import { borderRadius, inputColor, primaryTextColor, primaryTextTitleColor, secondaryTextColor } from "../../../components/theme";
import { BsHouseAddFill } from "react-icons/bs";
import { ImStatsBars } from "react-icons/im";
import { IoIosSearch } from "react-icons/io";
import { IoMdClose } from "react-icons/io";
import { AUTHORIZATION_HEADERS, authorityCheck, convertToBillNumber } from "../../../utils/helper/helper";
import { FaStar } from "react-icons/fa6";
import { FaBath } from "react-icons/fa";
import { IoBed } from "react-icons/io5";
import { IoIosExpand } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { BASE_API } from "../../../utils/constant/api";
import axios from "axios";
import LoadingComponent from "../../../components/LoadingComponent";

const index = () => {
  const navigate = useNavigate();
  const [listProperti, setListProperti] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [searchInput, setSearchInput] = useState<string>("");

  const getListProperti = async () => {
    setLoading(true);
    await axios
      .get(`${BASE_API}/property/list-property`, AUTHORIZATION_HEADERS)
      .then((res) => setListProperti(res.data.data.properties))
      .catch((error) => {
        authorityCheck(error.response.status);
      });
    setLoading(false);
  };
  useEffect(() => {
    getListProperti();
  }, []);
  return loading ? (
    <LoadingComponent />
  ) : (
    <Stack paddingY={"20px"} paddingX={{ base: "8px", md: "50px" }} width={"100%"} maxWidth={"1080px"} gap={"32px"}>
      {/* <pre>{JSON.stringify(listProperti, null, 2)}</pre> */}
      <HStack justifyContent={"space-between"} flexWrap={"wrap"}>
        <HStack
          padding={"16px"}
          backgroundColor={"black"}
          borderRadius={borderRadius()}
          // maxWidth={"475px"}
          width={{ base: "100%", sm: "48%" }}
          aspectRatio={"100/27"}
          color={"white"}
          gap={"20px"}
          onClick={() => navigate("/owner/daftar-properti")}
          cursor={"pointer"}
        >
          <BsHouseAddFill style={{ fontSize: "38px" }} />
          <Stack gap={"0px"}>
            <Text fontWeight={"bold"}>Tambah Properti</Text>
            <Text color={secondaryTextColor()}>Buat Kontrakan, Apartemen atau Kost Baru Kamu</Text>
          </Stack>
        </HStack>

        <HStack
          padding={"16px"}
          backgroundColor={"black"}
          borderRadius={borderRadius()}
          // maxWidth={"475px"}
          width={{ base: "100%", sm: "48%" }}
          aspectRatio={"100/27"}
          color={"white"}
          gap={"20px"}
          cursor={"pointer"}
        >
          <ImStatsBars style={{ fontSize: "38px" }} />
          <Stack gap={"0px"}>
            <Text fontWeight={"bold"}>Iklan Properti</Text>
            <Text color={secondaryTextColor()}>Iklankan properti kamu agar diakses banyak orang</Text>
          </Stack>
        </HStack>
      </HStack>
      <InputGroup boxShadow={"-2px -2px 8px 0px rgba(0, 0, 0, 0.1)"} color={inputColor()} borderRadius={"100px"}>
        <Input borderRadius={"100px"} placeholder="Cari Properti Kamu" value={searchInput} onChange={(e) => setSearchInput(e.target.value)} />
        <InputRightElement width="4.5rem" borderRadius={"100px"}>
          <HStack>
            <IoIosSearch style={{ color: "#C58E24", fontSize: "20px" }} />
            <IoMdClose style={{ color: secondaryTextColor(), fontSize: "20px" }} />
          </HStack>
        </InputRightElement>
      </InputGroup>

      <Text fontWeight={"bold"} color={primaryTextColor()} fontSize={"2xl"}>
        Kontrakan
      </Text>
      {/* <pre>{JSON.stringify(listProperti, null, 2)}</pre> */}

      <HStack flexWrap={"wrap"} justifyContent={"space-between"}>
        {listProperti
          .filter((i: any) => i.nama.toLowerCase().includes(searchInput.toLowerCase()))
          .map((i: any, index: number) => (
            <HStack key={index} height={"240px"} width={"450px"} padding={"0px"}>
              <Image width={{ base: "48%", sm: "220px" }} aspectRatio={"1/1"} objectFit={"cover"} src={i.image} borderRadius={borderRadius()} />
              <Stack
                boxShadow={"-2px -2px 8px 0px rgba(0, 0, 0, 0.1)"}
                padding={"12px"}
                width={{ base: "55%", sm: "250px" }}
                position={"absolute"}
                backgroundColor={"white"}
                marginLeft={{ base: "38%", sm: "200px" }}
                borderRadius={"20px"}
                gap={"3px"}
              >
                <Text fontWeight={"bold"} color={secondaryTextColor()} fontSize={"xl"}>
                  {i.nama}
                </Text>
                <Badge colorScheme="green" position={"absolute"} top={"0"} right={"0"} fontSize={"12px"}>
                  Aktif
                </Badge>
                <Text fontWeight={"bold"} color={primaryTextTitleColor()}>
                  {convertToBillNumber(
                    i.minimum_sewa == 1
                      ? i.harga_sewa_1_bulan
                      : i.minimum_sewa == 3
                      ? i.harga_sewa_3_bulan
                      : i.minimum_sewa == 12
                      ? i.harga_sewa_tahun
                      : ""
                  )}{" "}
                  / {i.minimum_sewa == 1 ? "bulan" : i.minimum_sewa == 3 ? "3 bulan" : i.minimum_sewa == 12 ? "tahun" : ""}
                </Text>
                {i.rating ? (
                  <HStack>
                    <HStack gap={"5px"}>
                      <FaStar style={{ color: "rgba(255, 206, 49, 1)", fontSize: "12px" }} />
                      <FaStar style={{ color: "rgba(255, 206, 49, 1)", fontSize: "12px" }} />
                      <FaStar style={{ color: "rgba(255, 206, 49, 1)", fontSize: "12px" }} />
                      <FaStar style={{ color: "rgba(255, 206, 49, 1)", fontSize: "12px" }} />
                      <FaStar style={{ color: "rgba(255, 206, 49, 1)", fontSize: "12px" }} />
                    </HStack>
                    <Text color={secondaryTextColor()} fontWeight={"bold"}>
                      5.0 (2 Penilaian)
                    </Text>
                  </HStack>
                ) : (
                  <Text color={secondaryTextColor()}>Belum ada penilaian</Text>
                )}

                <HStack justifyContent={"space-between"} color={"rgba(96, 90, 90, 1)"} fontSize={"12px"} gap={"5px"} fontWeight={"bold"}>
                  <HStack>
                    <FaBath />
                    <Text>{i.kamar_mandi}</Text>
                  </HStack>
                  <HStack>
                    <IoBed />
                    <Text>{i.total_kamar}</Text>
                  </HStack>
                  <HStack>
                    <IoIosExpand />
                    <Text>{i.lebar_tanah}m2</Text>
                  </HStack>
                </HStack>

                <Button
                  onClick={() => navigate(`detail/${i.id}`)}
                  color={"white"}
                  backgroundColor={"black"}
                  size={"sm"}
                  _hover={{ backgroundColor: "black" }}
                  marginTop={"20px"}
                >
                  Edit properti
                </Button>
              </Stack>
            </HStack>
          ))}
      </HStack>
    </Stack>
  );
};

export default index;
