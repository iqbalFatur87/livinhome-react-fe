import { Button, Image, Stack, Text } from "@chakra-ui/react";
import { primaryTextColor } from "../../../../components/theme";
import { Link } from "react-router-dom";
import { EMAIL_VERIFICATION, OTP_VERIFICATION, PHONE_VERIVICATION, SUCCESS_RESET_PASSWORD } from "../../../../utils/constant/localStorage";

export const Succesfully = () => {
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
        <Image alignSelf={"center"} width={"163px"} src="/success-reset-password.png" />
        <Text textAlign={"center"} lineHeight={"4"} fontSize={"sm"} color={primaryTextColor()}>
          Kata sandi Kamu berhasil diperbarui
        </Text>
        <Link to={"/auth/login"} style={{ width: "100%" }}>
          <Button
            width={"100%"}
            color={"white"}
            backgroundColor={"black"}
            borderRadius={"30px"}
            size={"lg"}
            _hover={{ backgroundColor: "black" }}
            onClick={() => {
              localStorage.removeItem(PHONE_VERIVICATION);
              localStorage.removeItem(EMAIL_VERIFICATION);
              localStorage.removeItem(OTP_VERIFICATION);
              localStorage.removeItem(SUCCESS_RESET_PASSWORD);
            }}
          >
            Lanjutkan
          </Button>
        </Link>
      </Stack>
    </Stack>
  );
};
