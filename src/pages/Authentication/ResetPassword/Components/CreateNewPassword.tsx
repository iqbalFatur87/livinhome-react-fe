import { Button, Input, Stack, Text, useToast } from "@chakra-ui/react";
import { borderRadius, primaryTextColor } from "../../../../components/theme";
import { useState } from "react";
import { EMAIL_VERIFICATION, PHONE_VERIVICATION, SUCCESS_RESET_PASSWORD } from "../../../../utils/constant/localStorage";
import axios from "axios";
import { BASE_API } from "../../../../utils/constant/api";

export const CreateNewPassword = () => {
  const [passwordFirstInput, setPasswordFirstInput] = useState<string>("");
  const [passwordSecondInput, setPasswordSecondInput] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  const resetPassword = async () => {
    setLoading(true);
    try {
      let reqBody: any;
      if (localStorage[PHONE_VERIVICATION]) {
        reqBody = { phone_number: localStorage[PHONE_VERIVICATION], password: passwordFirstInput, password_confirmation: passwordSecondInput };
      } else if (localStorage[EMAIL_VERIFICATION]) {
        reqBody = { email: localStorage[EMAIL_VERIFICATION], password: passwordFirstInput, password_confirmation: passwordSecondInput };
      }
      await axios
        .post(`${BASE_API}/reset-password`, reqBody)
        .then((res) => {
          toast({
            description: res.data.meta.message,
            status: "success",
            variant: "subtle",
            duration: 9000,
            isClosable: true,
          });
          localStorage[SUCCESS_RESET_PASSWORD] = true;
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
          Buat Kata Sandi Baru
        </Text>
        <Text lineHeight={"4"} fontSize={"sm"} color={primaryTextColor()}>
          Masukan kata sandi baru kamu
        </Text>
        <Input
          value={passwordFirstInput}
          onChange={(e) => setPasswordFirstInput(e.target.value)}
          borderRadius={borderRadius()}
          placeholder="Kata Sandi (minimal 8 karakter)"
          type="password"
        />
        <Input
          value={passwordSecondInput}
          onChange={(e) => setPasswordSecondInput(e.target.value)}
          borderRadius={borderRadius()}
          placeholder="Masukan Ulang Kata Sandi (minimal 8 karakter)"
          type="password"
        />

        {passwordFirstInput.length < 8 ? (
          <Text lineHeight={"4"} fontSize={"sm"} color={"red.400"}>
            Password harus lebih dari 8 karakter
          </Text>
        ) : null}

        {passwordFirstInput.length >= 8 && passwordFirstInput !== passwordSecondInput ? (
          <Text lineHeight={"4"} fontSize={"sm"} color={"red.400"}>
            katasandi ulang tidak sesuai
          </Text>
        ) : null}

        {passwordFirstInput == passwordSecondInput && passwordFirstInput !== "" ? (
          <Button
            type="submit"
            color={"white"}
            backgroundColor={"black"}
            borderRadius={"30px"}
            size={"lg"}
            _hover={{ backgroundColor: "black" }}
            onClick={resetPassword}
            isLoading={loading}
          >
            Lanjutkan
          </Button>
        ) : null}
      </Stack>
    </Stack>
  );
};
