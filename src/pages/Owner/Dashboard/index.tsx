import { Badge, Button, HStack, Image, Stack, Text } from "@chakra-ui/react";
import { borderRadius, primaryTextColor, primaryTextTitleColor, secondaryTextColor } from "../../../components/theme";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { authorityCheck, AUTHORIZATION_HEADERS, convertToBillNumber } from "../../../utils/helper/helper";
import { BASE_API } from "../../../utils/constant/api";
import LoadingComponent from "../../../components/LoadingComponent";
import { FaBath, FaStar } from "react-icons/fa6";
import { IoBed } from "react-icons/io5";
import { IoIosExpand } from "react-icons/io";
import { BsHouseAddFill } from "react-icons/bs";

const index = () => {
  const navigate = useNavigate();
  const [properti, setProperti] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const getProperti = async () => {
    setLoading(true);
    setProperti([]);
    await axios
      .get(`${BASE_API}/property/list-property`, AUTHORIZATION_HEADERS)
      .then((res) => setProperti(res.data.data.properties?.[0] || null))
      .catch((error) => {
        authorityCheck(error.response.status);
      });
    setLoading(false);
  };
  useEffect(() => {
    getProperti();
  }, []);

  return loading ? (
    <LoadingComponent />
  ) : (
    <HStack flexWrap={"wrap"} gap="20px" justifyContent={"center"} alignItems={"start"}>
      <Stack
        width={{ base: "100%", lg: "242px" }}
        height={"204px"}
        padding={"16px"}
        borderRadius={"24px"}
        boxShadow={"-2px -2px 8px 0px #0000001A"}
        gap={"16px"}
        alignItems={"center"}
        justifyContent={"center"}
      >
        <Image src="/avatar.png" width={"50px"} height={"50px"} objectFit={"contain"} />
        <HStack>
          <Stack alignItems={"center"} gap={"4px"}>
            <Text fontWeight="bold" color={primaryTextColor()} fontSize="xl">
              2
            </Text>
            <Text color={primaryTextColor()}>Properti</Text>
          </Stack>
          <Stack alignItems={"center"} gap={"4px"}>
            <Text fontWeight="bold" color={primaryTextColor()} fontSize="xl">
              2
            </Text>
            <Text color={primaryTextColor()}>Transaksi</Text>
          </Stack>
        </HStack>
      </Stack>
      <Stack flexGrow={1}>
        <Stack padding={"16px"} borderRadius={"24px"} boxShadow={"-2px -2px 8px 0px #0000001A"} gap={"16px"} width={"auto"} marginBottom={"30px"}>
          <Text fontWeight="bold" color={primaryTextColor()} fontSize="xl">
            Tanggapi Segera
          </Text>
          <Text color={secondaryTextColor()}>Pastikan Kamu sudah mempersiapkan diri untuk bertemu dengan calon penyewa di properti Kamu</Text>

          <Stack gap={"24px"}>
            <HStack gap={"16px"}>
              <Stack
                borderRadius={"80px"}
                padding={"10px"}
                width={"56px"}
                height={"56px"}
                color={"white"}
                backgroundColor={primaryTextTitleColor()}
                fontSize={"24px"}
                fontWeight={"bold"}
              >
                <Text margin={"auto"}>2</Text>
              </Stack>
              <Stack gap={"0px"}>
                <Text color={primaryTextColor()} fontWeight={"bold"}>
                  Pengajuan Sewa
                </Text>
                <Link to={"/owner/pengajuan-sewa/list"}>
                  <Text as="u" color={secondaryTextColor()} cursor={"pointer"}>
                    Selengkapnya
                  </Text>
                </Link>
              </Stack>
            </HStack>

            <HStack gap={"16px"}>
              <Stack
                borderRadius={"80px"}
                padding={"10px"}
                width={"56px"}
                height={"56px"}
                color={"white"}
                backgroundColor={primaryTextTitleColor()}
                fontSize={"24px"}
                fontWeight={"bold"}
              >
                <Text margin={"auto"}>1</Text>
              </Stack>
              <Stack gap={"0px"}>
                <Text color={primaryTextColor()} fontWeight={"bold"}>
                  Pengajuan Survei
                </Text>
                <Link to={"/owner/pengajuan-survei"}>
                  <Text as="u" color={secondaryTextColor()} cursor={"pointer"}>
                    Selengkapnya
                  </Text>
                </Link>
              </Stack>
            </HStack>
          </Stack>
        </Stack>
        <Text fontWeight={"bold"} color={primaryTextColor()} fontSize={"2xl"} textAlign={"center"}>
          Kelola Properti
        </Text>

        <HStack
          // justifyContent={{ base: "center", md: "space-between}" }}
          justifyContent={"space-between"}
          // backgroundColor={"lightblue"}

          position={"relative"}
          width={"100%"}
        >
          <Stack zIndex={2}>
            {properti ? (
              <HStack height={"240px"} width={{ base: "100%", md: "450px" }} padding={"0px"}>
                <Image
                  width={{ base: "48%", sm: "220px" }}
                  aspectRatio={"1/1"}
                  objectFit={"cover"}
                  src={properti.image}
                  borderRadius={borderRadius()}
                />
                <Stack
                  boxShadow={"-2px -2px 8px 0px rgba(0, 0, 0, 0.1)"}
                  padding={"12px"}
                  width={{ base: "60%", sm: "250px" }}
                  position={"absolute"}
                  backgroundColor={"white"}
                  marginLeft={{ base: "38%", sm: "200px" }}
                  borderRadius={"20px"}
                  gap={"3px"}
                >
                  <Text fontWeight={"bold"} color={secondaryTextColor()} fontSize={"xl"}>
                    {properti.nama}
                  </Text>
                  <Badge colorScheme="green" position={"absolute"} top={"0"} right={"0"} fontSize={"12px"}>
                    Aktif
                  </Badge>
                  <Text fontWeight={"bold"} color={primaryTextTitleColor()}>
                    {convertToBillNumber(
                      properti.minimum_sewa == 1
                        ? properti.harga_sewa_1_bulan
                        : properti.minimum_sewa == 3
                        ? properti.harga_sewa_3_bulan
                        : properti.minimum_sewa == 12
                        ? properti.harga_sewa_tahun
                        : ""
                    )}{" "}
                    / {properti.minimum_sewa == 1 ? "bulan" : properti.minimum_sewa == 3 ? "3 bulan" : properti.minimum_sewa == 12 ? "tahun" : ""}
                  </Text>
                  {properti.rating ? (
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
                      <Text>{properti.total_kamar}</Text>
                    </HStack>
                    <HStack>
                      <IoBed />
                      <Text>{properti.total_kamar}</Text>
                    </HStack>
                    <HStack>
                      <IoIosExpand />
                      <Text>{properti.lebar_tanah}m2</Text>
                    </HStack>
                  </HStack>

                  <Button
                    onClick={() => navigate(`/owner/management-properti/detail/${properti.id}`)}
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
            ) : null}

            <HStack
              padding={"16px"}
              backgroundColor={{ base: "rgba(69, 46, 2, 1)", md: "none" }}
              borderRadius={borderRadius()}
              border={"2px solid white"}
              // maxWidth={"475px"}
              aspectRatio={"100/27"}
              color={"white"}
              gap={"20px"}
              onClick={() => navigate("/owner/daftar-properti")}
              cursor={"pointer"}
            >
              <BsHouseAddFill style={{ fontSize: "38px" }} />
              <Stack gap={"0px"}>
                <Text fontWeight={"bold"}>Tambah Properti</Text>
                <Text>Buat Kontrakan, Apartemen atau Kost Baru Kamu</Text>
              </Stack>
            </HStack>
          </Stack>
          <Image zIndex={2} display={{ base: "none", md: "block" }} width={"37%"} maxWidth={"450px"} src="/building.png" />
          <Image src="/Vector 1.png" display={{ base: "none", md: "block" }} zIndex={1} width={"100%"} position={"absolute"} bottom={"0px"} />
        </HStack>
      </Stack>
    </HStack>
  );
};

export default index;
