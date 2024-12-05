import { Button, HStack, Image, Input, InputGroup, InputRightAddon, Stack, Text } from "@chakra-ui/react";
import { useState } from "react";
import { AiOutlineHome } from "react-icons/ai";
import { TbAdjustmentsHorizontal } from "react-icons/tb";
import { IoIosExpand, IoMdClose } from "react-icons/io";
import { primaryTextTitleColor, secondaryTextColor } from "../../../components/theme";
import { convertToBillNumber } from "../../../utils/helper/helper";
import { FaBath, FaStar } from "react-icons/fa6";
import { IoBed } from "react-icons/io5";

const index = () => {
  const [searchInput, setSearchInput] = useState<string>("");
  // const [filterProperty, setFilterProperty] = useState<string>("Semua");
  const filterProperty = "Semua";
  const count: number[] = [1, 2, 3, 4, 5];

  return (
    <Stack>
      <HStack flexWrap={"wrap"}>
        <InputGroup width={"370px"}>
          <Input placeholder="Cari Properti" value={searchInput} onChange={(e) => setSearchInput(e.target.value)} />
          <InputRightAddon cursor={"pointer"} backgroundColor={"transparent"} _hover={{ backgroundColor: "#E2E8F0" }}>
            <IoMdClose />
          </InputRightAddon>
        </InputGroup>

        <Button>
          <TbAdjustmentsHorizontal style={{ fontSize: "18px" }} />
        </Button>
        <Button>
          <HStack>
            <AiOutlineHome />
            <Text>{filterProperty}</Text>
          </HStack>
        </Button>
        <Button>Rp.1.000.000 - Rp.2.000.000</Button>
      </HStack>

      <HStack justifyContent={"space-between"} fontSize={"16px"} marginTop={"30px"}>
        <Text fontWeight={"500"}>Kota Bandung</Text>
        <Text>200 Hasil</Text>
      </HStack>
      <HStack flexWrap={"wrap"} marginTop={"30px"} gap={"20px"}>
        {count.map((i: number) => (
          <HStack
            key={i}
            width={{ base: "100%", md: "auto" }}
            height={"126px"}
            boxShadow={"-2px -2px 8px 0px rgba(0, 0, 0, 0.1);"}
            borderRadius={"24px"}
          >
            <Image width={"120px"} height={"100%"} objectFit={"cover"} src="/sample-apartement.png" borderLeftRadius={"24px"} />
            <Stack margin={"16px"}>
              <Text fontWeight={"bold"} fontSize={"16px"} color={"rgba(153, 145, 145, 1)"}>
                Sukapura
              </Text>
              <HStack gap={"4px"}>
                <Text fontWeight={"bold"} color={primaryTextTitleColor()}>
                  {convertToBillNumber(58000000)} /
                </Text>
                <Text>tahun</Text>
              </HStack>
              <HStack>
                <HStack gap={"5px"}>
                  <FaStar style={{ color: "rgba(255, 206, 49, 1)", fontSize: "12px" }} />
                  <FaStar style={{ color: "rgba(255, 206, 49, 1)", fontSize: "12px" }} />
                  <FaStar style={{ color: "rgba(255, 206, 49, 1)", fontSize: "12px" }} />
                  <FaStar style={{ color: "rgba(255, 206, 49, 1)", fontSize: "12px" }} />
                  <FaStar style={{ color: "rgba(255, 206, 49, 1)", fontSize: "12px" }} />
                </HStack>
                <Text color={secondaryTextColor()} fontWeight={"bold"} fontSize={"10px"}>
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
            </Stack>
          </HStack>
        ))}
      </HStack>
    </Stack>
  );
};

export default index;
