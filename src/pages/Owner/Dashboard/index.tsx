import { HStack, Image, Stack, Text } from "@chakra-ui/react";
import { primaryTextColor, primaryTextTitleColor, secondaryTextColor } from "../../../components/theme";
import { Link } from "react-router-dom";

const index = () => {
  return (
    <HStack flexWrap={"wrap"} gap="20px" justifyContent={"center"}>
      <Stack
        width={"242px"}
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
      <Stack padding={"16px"} borderRadius={"24px"} boxShadow={"-2px -2px 8px 0px #0000001A"} gap={"16px"} width={"auto"}>
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
    </HStack>
  );
};

export default index;
