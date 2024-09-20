import { Button, HStack, Image, Stack, Text, useDisclosure } from "@chakra-ui/react";
import { borderRadius, primaryTextColor, primaryTextTitleColor, secondaryTextColor } from "../../../components/theme";
import { MdOutlineNotificationsActive } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { convertToBillNumber, logout } from "../../../utils/helper/helper";
import { FaStar } from "react-icons/fa6";
import { FaBath } from "react-icons/fa";
import { IoBed } from "react-icons/io5";
import { IoIosExpand } from "react-icons/io";
import ModalKonfirmasi from "./components/ModalKonfirmasi";

const index = () => {
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Stack paddingY={"20px"} paddingX={{ base: "8px", md: "50px" }} width={"100%"} maxWidth={"1080px"} gap={"32px"}>
      <Button onClick={logout} position={"fixed"} top={"0"} right={0} colorScheme={"red"}>
        Logout
      </Button>
      <Stack>
        <Text fontWeight={"bold"} color={primaryTextColor()} textAlign={"start"} fontSize={"xl"}>
          Pengajuan Sewa
        </Text>
        <HStack fontSize={"16px"}>
          <MdOutlineNotificationsActive style={{ fontWeight: "bold", fontSize: "20px" }} />
          <Text>Pastikan kamu sudah mempersiapkan diri bertemu dengan calon penyewa di waktu yang sudah ditentukan</Text>
        </HStack>
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
            Pengajuan Sewa
          </Text>
        </Stack>
        <HStack justifyContent={"space-between"}>
          <Text fontWeight={"bold"} color={primaryTextColor()}>
            Kontrakan Brader
          </Text>
          <Text color={secondaryTextColor()}>Properti</Text>
        </HStack>
        <HStack justifyContent={"space-between"}>
          <Text fontWeight={"bold"} color={primaryTextColor()}>
            Nama
          </Text>
          <Text color={secondaryTextColor()}>Agus Brembo</Text>
        </HStack>
        <HStack justifyContent={"space-between"}>
          <Text fontWeight={"bold"} color={primaryTextColor()}>
            Tanggal Masuk
          </Text>
          <Text color={secondaryTextColor()}>31 Agustus 2024</Text>
        </HStack>
        <HStack justifyContent={"space-between"}>
          <Text fontWeight={"bold"} color={primaryTextColor()}>
            Durasi Sewa
          </Text>
          <Text color={secondaryTextColor()}>1 Tahun</Text>
        </HStack>
        <Text textAlign={"center"} color={"rgba(212, 47, 47, 1)"} marginTop={"20px"}>
          Konfirmasi sebelum Minggu 17 Agustus 2024, 21:57
        </Text>
        <Button color={"white"} backgroundColor={"black"} size={"sm"} _hover={{ backgroundColor: "black" }} marginTop={"20px"}>
          Info Selengkapnya
        </Button>
      </Stack>

      <Text fontWeight={"bold"} color={primaryTextColor()} textAlign={"start"} fontSize={"xl"}>
        Informasi Calon Penyewa
      </Text>

      <HStack flexWrap={"wrap"} alignItems={"flex-start"} justifyContent={"space-between"}>
        <Stack width={{ base: "95%", lg: "45%" }}>
          <HStack cursor={"pointer"} height={"240px"} width={"450px"} padding={"0px"} onClick={() => navigate("/owner/pengajuan-sewa")}>
            <Image
              width={{ base: "48%", sm: "220px" }}
              aspectRatio={"1/1"}
              objectFit={"cover"}
              src="https://s3-alpha-sig.figma.com/img/8ba3/c66e/c7ccb4428431951e8d3c7467792f5aec?Expires=1725235200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=oAkHlzp0jEd1eNJWZOKlaPgS0Wwu1Mx~8At7qiep40NQs0PI3AYjbWASkO7H3Y3Py66YUdQiV~l44vrG3yaRrKG8lVnHaLtMcIMdKv2mnPCg3nlWUyFYHgLpEYk0tTdqYwahwcx0TsCX21T7B1WbqDHjp6KeBS4DqgXgtYDCcn-bLmO71heZuwETDtr6oZTlauiOJhwQSSTor8ZavlW94L8jsIcS8mfm43gKPz8V6cTnOnnHdtSIFygZes80niA5mBQSPbJHrU4r7Nv2SX38UVvsuMWTeaSAyTituQQjDOnoxVGFd~TJ-qMkAmnox00FITMdWKHLl1gbJTOn0pyNBA__"
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
                Dipatiukur
              </Text>
              <Text fontWeight={"bold"} color={primaryTextTitleColor()}>
                {convertToBillNumber(60000000)} / tahun
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
              <HStack justifyContent={"space-between"} color={"rgba(96, 90, 90, 1)"} fontSize={"12px"} gap={"5px"} fontWeight={"bold"}>
                <HStack>
                  <FaBath />
                  <Text>3</Text>
                </HStack>
                <HStack>
                  <IoBed />
                  <Text>5</Text>
                </HStack>
                <HStack>
                  <IoIosExpand />
                  <Text>120m2</Text>
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
            <HStack>
              <Text fontWeight={"bold"} color={primaryTextColor()}>
                Jumlah Penyewa:
              </Text>
              <Text color={secondaryTextColor()}>5 Penyewa</Text>
            </HStack>

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
                <Text color={secondaryTextColor()}>Agus Brembo</Text>
              </HStack>
              <HStack justifyContent={"space-between"}>
                <Text fontWeight={"bold"} color={primaryTextColor()}>
                  Nomor Hp
                </Text>
                <Text color={secondaryTextColor()}>08512312312</Text>
              </HStack>
              <HStack justifyContent={"space-between"}>
                <Text fontWeight={"bold"} color={primaryTextColor()}>
                  Jenis Kelamin
                </Text>
                <Text color={secondaryTextColor()}>Laki-laki</Text>
              </HStack>
              <HStack justifyContent={"space-between"}>
                <Text fontWeight={"bold"} color={primaryTextColor()}>
                  Status
                </Text>
                <Text color={secondaryTextColor()}>Belum Kawin</Text>
              </HStack>
              <HStack justifyContent={"space-between"}>
                <Text fontWeight={"bold"} color={primaryTextColor()}>
                  Pekerjaan
                </Text>
                <Text color={secondaryTextColor()}>Mahasiswa</Text>
              </HStack>
              <HStack justifyContent={"space-between"}>
                <Text fontWeight={"bold"} color={primaryTextColor()}>
                  Nama Perguruan Tinggi
                </Text>
                <Text color={secondaryTextColor()}>Telkom University</Text>
              </HStack>

              <Stack borderBottom={"1px"} borderColor={"rgba(179, 179, 179, 1)"} paddingBottom={"10px"}>
                <Text fontWeight={"bold"} color={primaryTextColor()} textAlign={"start"} fontSize={"md"}>
                  Dokumen
                </Text>
              </Stack>
              <Image src="https://s3-alpha-sig.figma.com/img/c017/f62c/3705b252b361ef08aa2135909a34bdf4?Expires=1725840000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=qdpeUczexMd1ntAj1TK54Eeav5AwFyIQeVd7QkM0VbVfn5lQ5kpovfuvbA0f0gw4BwkpMusoPWD4hbf0yAZY2z3h0APQnwg-Q7zOWzbzFmQt21x0bxGuBCj5d~xd1V7zXQ4J68igOxSMxuk01mk4ZAKdWBnbWUh-4mrV3YPiMX0mAoybjtHI-s6jqL1SlsRjF37mjY4Y-0XHyV1tQ6258~j-DSTHRdSj~yf8vZcxWMCYllTgv02l3yFCSIBgBgKH-mjeX7cXwJeOWi9J4wbHb8PELBjNlhdD5T7DiyIncZn2k3Vr2tMZ7cliLLYxshCW5i9FY07Yi3IUOgPbPeo2Sg__" />
            </Stack>
          </Stack>
        </Stack>
        <Stack width={{ base: "95%", md: "48%" }}>
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
              <Text color={secondaryTextColor()}>31 Agustus 2024</Text>
            </HStack>
            <HStack justifyContent={"space-between"}>
              <Text fontWeight={"bold"} color={primaryTextColor()}>
                Sewa Berakhir
              </Text>
              <Text color={secondaryTextColor()}>31 Agustus 2025</Text>
            </HStack>
            <HStack justifyContent={"space-between"}>
              <Text fontWeight={"bold"} color={primaryTextColor()}>
                Durasi Sewa
              </Text>
              <Text color={secondaryTextColor()}>1 Tahun</Text>
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
              {convertToBillNumber(60000000)}
            </Text>

            <Text textAlign={"center"} color={"rgba(212, 47, 47, 1)"} marginTop={"20px"}>
              Konfirmasi sebelum Minggu 17 Agustus 2024, 21:57
            </Text>

            <HStack>
              <Button size={"sm"} marginTop={"20px"} variant={"outline"} width={"100%"}>
                Tolak
              </Button>
              <Button
                onClick={onOpen}
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
          <ModalKonfirmasi isOpen={isOpen} onOpen={onOpen} onClose={onClose} />
        </Stack>
      </HStack>

      <Text fontWeight={"bold"} color={primaryTextColor()} textAlign={"start"} fontSize={"xl"}>
        Pembayaran Calon Penyewa
      </Text>
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
            Tanggal Checkin
          </Text>
          <Text color={secondaryTextColor()}>31 Agustus 2024</Text>
        </HStack>
        <HStack justifyContent={"space-between"}>
          <Text fontWeight={"bold"} color={primaryTextColor()}>
            Sewa Berkahir
          </Text>
          <Text color={secondaryTextColor()}>31 Agustus 2025</Text>
        </HStack>
        <HStack justifyContent={"space-between"}>
          <Text fontWeight={"bold"} color={primaryTextColor()}>
            Durasi Sewa
          </Text>
          <Text color={secondaryTextColor()}>1 Tahun</Text>
        </HStack>
        <HStack justifyContent={"space-between"}>
          <Text fontWeight={"bold"} color={primaryTextColor()}>
            Total Tagihan
          </Text>
          <Text color={secondaryTextColor()}>{convertToBillNumber(60000000)}</Text>
        </HStack>
      </Stack>
      <Text fontWeight={"bold"} color={"rgba(212, 47, 47, 1)"}>
        Mohon tunggu calon penyewa melakukan pembayaran sebelum: Rabu 20 Agustus 2024, 14.20
      </Text>
      <Button size={"sm"} marginTop={"20px"} variant={"outline"} width={{ base: "100%", md: "464px" }}>
        Batalkan Konfirmasi Pengajuan Sewa
      </Button>
    </Stack>
  );
};

export default index;
