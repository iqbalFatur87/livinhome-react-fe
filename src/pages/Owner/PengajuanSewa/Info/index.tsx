import { Button, HStack, Image, Stack, Text, useDisclosure, useToast } from "@chakra-ui/react";
import { borderRadius, primaryTextColor, primaryTextTitleColor, secondaryTextColor } from "../../../../components/theme";
import { MdOutlineNotificationsActive } from "react-icons/md";
import { authorityCheck, AUTHORIZATION_HEADERS, convertToBillNumber, convertToHumanDate } from "../../../../utils/helper/helper";
import { FaStar } from "react-icons/fa6";
import { useNavigate, useParams } from "react-router-dom";
// import { FaBath } from "react-icons/fa";
import { IoBed } from "react-icons/io5";
import { IoIosExpand } from "react-icons/io";
import ModalKonfirmasi from "./components/ModalKonfirmasi";
import { useEffect, useState } from "react";
import axios from "axios";
import { BASE_API } from "../../../../utils/constant/api";
import LoadingComponent from "../../../../components/LoadingComponent";
import ModalTolak from "./components/ModalTolakj";

const index = () => {
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [modalType, setModalType] = useState<string | null>(null);
  const [dataState, setDataState] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const toast = useToast();
  const { id } = useParams();
  const getData = async () => {
    setLoading(true);
    await axios
      .get(`${BASE_API}/pengajuan/detail/${id}`, AUTHORIZATION_HEADERS)
      .then((res) => setDataState(res.data.data))
      .catch((e) => {
        authorityCheck(e.response.status);
        toast({
          description: e.response.data.meta.message.join(", "),
          status: "error",
          variant: "subtle",
          duration: 9000,
          isClosable: true,
        });
      });
    setLoading(false);
  };
  useEffect(() => {
    getData();
  }, []);
  return loading ? (
    <LoadingComponent />
  ) : (
    <>
      {/* <pre>{JSON.stringify(dataState, null, 2)}</pre> */}
      <Text fontWeight={"bold"} color={primaryTextColor()} textAlign={"start"} fontSize={"xl"}>
        Informasi Calon Penyewa
      </Text>

      <HStack flexWrap={"wrap"} alignItems={"flex-start"} justifyContent={"space-between"}>
        <Stack width={{ base: "100%", lg: "45%" }}>
          <HStack cursor={"pointer"} height={"240px"} width={"450px"} padding={"0px"} onClick={() => navigate("/owner/pengajuan-sewa")}>
            <Image
              width={{ base: "48%", sm: "220px" }}
              aspectRatio={"1/1"}
              objectFit={"cover"}
              src={dataState?.property?.[0]?.image}
              borderRadius={borderRadius()}
            />

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
                {dataState?.property?.[0]?.nama}
              </Text>
              <Text fontWeight={"bold"} color={primaryTextTitleColor()}>
                {convertToBillNumber(
                  dataState?.property?.[0]?.minimum_sewa == 1
                    ? dataState?.property?.[0]?.harga_sewa_1_bulan
                    : dataState?.property?.[0]?.minimum_sewa == 3
                    ? dataState?.property?.[0]?.harga_sewa_3_bulan
                    : dataState?.property?.[0]?.minimum_sewa == 12
                    ? dataState?.property?.[0]?.harga_sewa_1_tahun
                    : 0
                )}{" "}
                / {dataState?.property?.[0]?.minimum_sewa} Bulan
              </Text>
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
              <HStack justifyContent={"center"} color={"rgba(96, 90, 90, 1)"} fontSize={"12px"} gap={"5px"} fontWeight={"bold"}>
                <HStack>
                  <IoBed />
                  <Text>{dataState?.property?.[0]?.kasur}</Text>
                </HStack>
                <HStack>
                  <IoIosExpand />
                  <Text>{dataState?.property?.[0]?.lebar_tanah}m2</Text>
                </HStack>
              </HStack>
              <Button color={"white"} backgroundColor={"black"} size={"sm"} _hover={{ backgroundColor: "black" }} marginTop={"20px"}>
                Edit properti
              </Button>
            </Stack>
          </HStack>
          <HStack fontSize={"16px"} borderBottom={"1px"} borderColor={"rgba(179, 179, 179, 1)"} paddingBottom={"20px"}>
            <MdOutlineNotificationsActive style={{ fontWeight: "bold", fontSize: "20px" }} />
            <Text>Pastikan kamu sudah mempersiapkan diri bertemu dengan calon penyewa di waktu yang sudah ditentukan</Text>
          </HStack>

          <Stack>
            <Stack
              // minHeight={"391px"}
              width={{ base: "100%", md: "464px" }}
              borderRadius={borderRadius()}
              borderColor={"rgba(197, 142, 36, 1)"}
              borderWidth={"1px"}
              padding={"16px"}
            >
              <Stack borderBottom={"1px"} borderColor={"rgba(179, 179, 179, 1)"} paddingBottom={"10px"}>
                <Text fontWeight={"bold"} color={primaryTextColor()} textAlign={"start"} fontSize={"md"}>
                  Detail Diri Penyewa
                </Text>
              </Stack>
              <HStack justifyContent={"space-between"}>
                <Text fontWeight={"bold"} color={primaryTextColor()}>
                  Nama
                </Text>
                <Text color={secondaryTextColor()}>{dataState?.fullname || "-"}</Text>
              </HStack>
              <HStack justifyContent={"space-between"}>
                <Text fontWeight={"bold"} color={primaryTextColor()}>
                  Nomor Hp
                </Text>
                <Text color={secondaryTextColor()}>{dataState?.phone_number || "-"}</Text>
              </HStack>
              <HStack justifyContent={"space-between"}>
                <Text fontWeight={"bold"} color={primaryTextColor()}>
                  Jenis Kelamin
                </Text>
                <Text color={secondaryTextColor()}>{dataState?.gender || "-"}</Text>
              </HStack>
              <HStack justifyContent={"space-between"}>
                <Text fontWeight={"bold"} color={primaryTextColor()}>
                  Status
                </Text>
                <Text color={secondaryTextColor()}>{dataState?.marriage || "-"}</Text>
              </HStack>
              <HStack justifyContent={"space-between"}>
                <Text fontWeight={"bold"} color={primaryTextColor()}>
                  Pekerjaan
                </Text>
                <Text color={secondaryTextColor()}>{dataState?.job || "-"}</Text>
              </HStack>
              <HStack justifyContent={"space-between"}>
                <Text fontWeight={"bold"} color={primaryTextColor()}>
                  Nama Perguruan Tinggi
                </Text>
                <Text color={secondaryTextColor()}>{dataState?.school_name || "-"}</Text>
              </HStack>

              <Stack borderBottom={"1px"} borderColor={"rgba(179, 179, 179, 1)"} paddingBottom={"10px"}>
                <Text fontWeight={"bold"} color={primaryTextColor()} textAlign={"start"} fontSize={"md"}>
                  Dokumen
                </Text>
              </Stack>
              <Image src={dataState?.id_card} />
            </Stack>
          </Stack>
        </Stack>

        <Stack
          // minHeight={"391px"}
          width={{ base: "100%", md: "464px" }}
          borderRadius={borderRadius()}
          borderColor={"rgba(197, 142, 36, 1)"}
          borderWidth={"1px"}
          padding={"16px"}
        >
          <Stack borderBottom={"1px"} borderColor={"rgba(179, 179, 179, 1)"} paddingBottom={"10px"}>
            <Text fontWeight={"bold"} color={primaryTextColor()} textAlign={"start"} fontSize={"md"}>
              Informasi Sewa
            </Text>
          </Stack>
          <HStack justifyContent={"space-between"}>
            <Text fontWeight={"bold"} color={primaryTextColor()}>
              Tanggal Masuk
            </Text>
            <Text color={secondaryTextColor()}>{convertToHumanDate(dataState?.checkin)}</Text>
          </HStack>
          <HStack justifyContent={"space-between"}>
            <Text fontWeight={"bold"} color={primaryTextColor()}>
              Sewa Berakhir
            </Text>
            <Text color={secondaryTextColor()}>{convertToHumanDate(dataState?.checkout)}</Text>
          </HStack>
          <HStack justifyContent={"space-between"}>
            <Text fontWeight={"bold"} color={primaryTextColor()}>
              Durasi Sewa
            </Text>
            <Text color={secondaryTextColor()}>{dataState?.duration}</Text>
          </HStack>
          <Stack borderBottom={"1px"} borderColor={"rgba(179, 179, 179, 1)"} paddingBottom={"10px"} marginTop={"30px"}>
            <Text fontWeight={"bold"} color={primaryTextColor()} textAlign={"start"} fontSize={"md"}>
              Layanan Tambahan
            </Text>
          </Stack>
          <HStack
            borderColor={"rgba(96, 90, 90, 1)"}
            borderRadius={"16px"}
            padding={"8px"}
            justifyContent={"space-between"}
            height={"100%"}
            marginBottom={"30px"}
          >
            <HStack>
              <Image src="/cleaning-services.png" />
              <Stack gap={"0px"}>
                <HStack gap={"0px"} fontWeight={"bold"}>
                  <Text>Livin</Text>
                  <Text color={primaryTextTitleColor()}>Clean</Text>
                </HStack>
                <Text color={secondaryTextColor()}>Jasa Kebersihan</Text>
              </Stack>
            </HStack>
            <Text fontWeight={"bold"} color={primaryTextColor()} alignSelf={"flex-end"} fontSize={"md"}>
              {convertToBillNumber(80000)}
            </Text>
          </HStack>

          <Stack borderBottom={"1px"} borderColor={"rgba(179, 179, 179, 1)"} paddingBottom={"10px"}>
            <Text fontWeight={"bold"} color={primaryTextColor()} textAlign={"start"} fontSize={"md"}>
              Total Harga
            </Text>
          </Stack>
          <Text fontWeight={"bold"} color={primaryTextColor()} textAlign={"start"} fontSize={"md"}>
            {convertToBillNumber(dataState?.total_price || 0)}
          </Text>

          <Text textAlign={"center"} color={"rgba(212, 47, 47, 1)"} marginTop={"20px"}>
            {/* Konfirmasi sebelum Minggu 17 Agustus 2024, 21:57 */}
            {dataState?.deadline}
          </Text>

          <HStack>
            <Button
              onClick={() => {
                setModalType("tolak");
                onOpen();
              }}
              size={"sm"}
              marginTop={"20px"}
              variant={"outline"}
              width={"100%"}
            >
              Tolak
            </Button>
            <Button
              onClick={() => {
                setModalType("konfirmasi");
                onOpen();
              }}
              color={"white"}
              backgroundColor={"black"}
              size={"sm"}
              _hover={{ backgroundColor: "black" }}
              marginTop={"20px"}
              width={"100%"}
            >
              Konfirmasi
            </Button>
          </HStack>
        </Stack>

        {modalType == "konfirmasi" ? (
          <ModalKonfirmasi id={id} isOpen={isOpen} onOpen={onOpen} onClose={onClose} setModalType={setModalType} />
        ) : modalType == "tolak" ? (
          <ModalTolak id={id} isOpen={isOpen} onOpen={onOpen} onClose={onClose} setModalType={setModalType} />
        ) : null}
      </HStack>
    </>
  );
};

export default index;
