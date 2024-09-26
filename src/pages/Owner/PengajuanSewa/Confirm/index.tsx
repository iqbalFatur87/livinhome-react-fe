import { Button, HStack, Stack, Text } from "@chakra-ui/react";
import { borderRadius, primaryTextColor, secondaryTextColor } from "../../../../components/theme";
import { convertToBillNumber } from "../../../../utils/helper/helper";

const index = () => {
  // const navigate = useNavigate();
  return (
    <>
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
    </>
  );
};

export default index;
