import { HStack, Image, Stack, Text } from "@chakra-ui/react";
import {
  primaryTextColor,
  secondaryTextColor,
} from "../../../../components/theme";

export const ChooseRole = (props: { setLoginState: any }) => {
  return (
    <Stack
      width={{ md: "100%", base: "95%" }}
      maxWidth={"530px"}
      boxShadow={"rgba(99, 99, 99, 0.2) 0px 2px 8px 0px"}
      borderRadius={"50px"}
      paddingX={{ base: "30px", md: "75px" }}
      paddingY={"40px"}
      backgroundColor={"white"}
      zIndex={"2"}
    >
      <Stack gap={"20px"}>
        <Text
          fontSize={"2xl"}
          fontWeight={"bold"}
          alignSelf={"center"}
          color={primaryTextColor()}
        >
          Masuk Ke Livinhome
        </Text>

        <Text alignSelf={"flex-start"} color={secondaryTextColor()}>
          Masuk Sebagai :
        </Text>

        <HStack
          gap={"20px"}
          justifyContent={"center"}
          width={"100%"}
          borderRadius={"20px"}
          paddingY={"20px"}
          cursor={"pointer"}
          boxShadow={"rgba(0, 0, 0, 0.16) 0px 1px 4px;"}
          _hover={{
            boxShadow:
              "rgba(17, 17, 26, 0.1) 0px 4px 16px, rgba(17, 17, 26, 0.05) 0px 8px 32px",
          }}
          onClick={() => props.setLoginState("Login Penyewa")}
        >
          <Image src="/login-penyewa-properti.png" />
          <Text color={primaryTextColor()}>Penyewa Properti</Text>
        </HStack>
        <HStack
          gap={"20px"}
          justifyContent={"center"}
          width={"100%"}
          borderRadius={"20px"}
          paddingY={"20px"}
          cursor={"pointer"}
          boxShadow={"rgba(0, 0, 0, 0.16) 0px 1px 4px;"}
          _hover={{
            boxShadow:
              "rgba(17, 17, 26, 0.1) 0px 4px 16px, rgba(17, 17, 26, 0.05) 0px 8px 32px",
          }}
          onClick={() => props.setLoginState("Login Pemilik Properti")}
        >
          <Image src="/login-pemilik-properti.png" />
          <Text color={primaryTextColor()}>Pemilik Properti</Text>
        </HStack>
      </Stack>
    </Stack>
  );
};
