import { Button, Input, Stack, Text, useToast } from "@chakra-ui/react";
import { borderRadius, primaryTextColor } from "../../../../components/theme";
import { useState } from "react";
import { EMAIL_VERIFICATION, OTP_VERIFICATION, PHONE_VERIVICATION } from "../../../../utils/constant/localStorage";
import axios from "axios";
import { BASE_API } from "../../../../utils/constant/api";

export const CodeVerification = () => {
  const [codeVerificationInput, setCodeVerificationInput] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const verifyCode = async () => {
    setLoading(true);
    try {
      let reqBody: any;
      let sentType: string = "";
      if (localStorage[PHONE_VERIVICATION]) {
        reqBody = { phone_number: localStorage[PHONE_VERIVICATION], OTP: codeVerificationInput };
        sentType = "varify-otp-whatsapp";
      } else if (localStorage[EMAIL_VERIFICATION]) {
        reqBody = { email: localStorage[EMAIL_VERIFICATION], OTP: codeVerificationInput };
        sentType = "verify-otp-email";
      }
      await axios
        .post(`${BASE_API}/${sentType}`, reqBody)
        .then((res) => {
          toast({
            description: res.data.meta.message,
            status: "success",
            variant: "subtle",
            duration: 9000,
            isClosable: true,
          });
        })
        .catch((e) => {
          toast({
            description: e.response.data.meta.message.join(", "),
            status: "error",
            variant: "subtle",
            duration: 9000,
            isClosable: true,
          });
        });
      localStorage[OTP_VERIFICATION] = codeVerificationInput;
      window.location.reload();
    } catch (error) {}

    setLoading(false);
  };

  const resendOTP = async () => {
    setLoading(true);
    try {
      let reqBody: any;
      let sentType: string = "";
      if (localStorage[PHONE_VERIVICATION]) {
        reqBody = { phone_number: localStorage[PHONE_VERIVICATION] };
        sentType = "sent-whatsapp";
        localStorage.removeItem(EMAIL_VERIFICATION);
      } else if (localStorage[EMAIL_VERIFICATION]) {
        reqBody = { email: localStorage[EMAIL_VERIFICATION] };
        sentType = "sent-email";
        localStorage.removeItem(PHONE_VERIVICATION);
      }
      await axios
        .post(`${BASE_API}/${sentType}`, reqBody)
        .then((res) => {
          toast({
            description: res.data.meta.message,
            status: "success",
            variant: "subtle",
            duration: 9000,
            isClosable: true,
          });
          window.location.reload();
        })
        .catch((e) => {
          toast({
            description: e.response.data.meta.message.join(", "),
            status: "error",
            variant: "subtle",
            duration: 9000,
            isClosable: true,
          });
        });
    } catch (error) {}

    setLoading(false);
  };
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
        <Text fontSize={"2xl"} fontWeight={"bold"} alignSelf={"center"} color={primaryTextColor()}>
          Masukan Code Verifikasi
        </Text>
        <Input value={codeVerificationInput} onChange={(e) => setCodeVerificationInput(e.target.value)} borderRadius={borderRadius()} />
        <Text textAlign={"center"} lineHeight={"4"} fontSize={"sm"} color={primaryTextColor()}>
          Kami sudah mengirim kode verifikasi ke Nomor Handphone Kamu
        </Text>

        {codeVerificationInput.length == 4 ? (
          <Button
            type="submit"
            color={"white"}
            backgroundColor={"black"}
            borderRadius={"30px"}
            size={"lg"}
            _hover={{ backgroundColor: "black" }}
            onClick={verifyCode}
            isLoading={loading}
          >
            Verifikasi
          </Button>
        ) : null}

        <Text onClick={resendOTP} textAlign={"center"} fontSize={"lg"} fontWeight={"bold"} color={primaryTextColor()} cursor={"pointer"}>
          Kirim Ulang
        </Text>
      </Stack>
    </Stack>
  );
};
