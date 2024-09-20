import { Button, Input, Stack, Tab, TabList, TabPanel, TabPanels, Tabs, Text, useToast } from "@chakra-ui/react";
import { borderRadius, primaryTextColor } from "../../../../components/theme";
import { useState } from "react";
import axios from "axios";
import { BASE_API } from "../../../../utils/constant/api";
import { EMAIL_VERIFICATION, PHONE_VERIVICATION } from "../../../../utils/constant/localStorage";

export const PhoneVerification = () => {
  const [loading, setLoading] = useState(false);
  const [phoneVerificationInput, setPhoneVerificationInput] = useState<string>("");
  const [emailVerificationInput, setEmailVerificationInput] = useState<string>("");
  const toast = useToast();

  const requestOTP = async (verificationType: string) => {
    setLoading(true);
    try {
      const requestData = verificationType === "phone number" ? { phone_number: phoneVerificationInput } : verificationType === "email" ? { email: emailVerificationInput } : null;
      const sentType = verificationType === "phone number" ? "sent-whatsapp" : verificationType === "email" ? "sent-email" : null;
      await axios
        .post(`${BASE_API}/${sentType}`, requestData)
        .then((res) => {
          toast({
            description: res.data.meta.message,
            status: "success",
            variant: "subtle",
            duration: 9000,
            isClosable: true,
          });
          if (verificationType == "phone number") {
            localStorage[PHONE_VERIVICATION] = phoneVerificationInput;
            localStorage.removeItem(EMAIL_VERIFICATION);
          } else if (verificationType == "email") {
            localStorage[EMAIL_VERIFICATION] = emailVerificationInput;
            localStorage.removeItem(PHONE_VERIVICATION);
          }
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
          Lupa Kata Sandi
        </Text>
        <Tabs isFitted variant="enclosed">
          <TabList mb="1em">
            <Tab>No. Handphone</Tab>
            <Tab>Email</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <Stack gap={"20px"}>
                <Input value={phoneVerificationInput} onChange={(e) => setPhoneVerificationInput(e.target.value)} borderRadius={borderRadius()} placeholder="Nomor Handphone" />
                <Text textAlign={"center"} lineHeight={"4"} fontSize={"sm"} color={primaryTextColor()}>
                  Kami akan mengirimkan kode verifikasi ke Nomor Handphone kamu untuk mengatur ulang kata sandi
                </Text>

                {phoneVerificationInput.length > 10 ? (
                  <Button
                    type="submit"
                    color={"white"}
                    backgroundColor={"black"}
                    borderRadius={"30px"}
                    size={"lg"}
                    _hover={{ backgroundColor: "black" }}
                    onClick={() => {
                      // props.setResetPasswordState("Code Verification");
                      requestOTP("phone number");
                    }}
                    isLoading={loading}
                  >
                    Kirim Kode Verifikasi
                  </Button>
                ) : null}
              </Stack>
            </TabPanel>
            <TabPanel>
              <Stack gap={"20px"}>
                <Input value={emailVerificationInput} onChange={(e) => setEmailVerificationInput(e.target.value)} borderRadius={borderRadius()} placeholder="Email" />
                <Text textAlign={"center"} lineHeight={"4"} fontSize={"sm"} color={primaryTextColor()}>
                  Kami akan mengirimkan kode verifikasi ke Email kamu untuk mengatur ulang kata sandi
                </Text>

                {emailVerificationInput.includes("@") && emailVerificationInput.includes(".") ? (
                  <Button
                    type="submit"
                    color={"white"}
                    backgroundColor={"black"}
                    borderRadius={"30px"}
                    size={"lg"}
                    _hover={{ backgroundColor: "black" }}
                    onClick={() => {
                      // props.setResetPasswordState("Code Verification");
                      requestOTP("email");
                    }}
                    isLoading={loading}
                  >
                    Kirim Kode Verifikasi
                  </Button>
                ) : null}
              </Stack>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Stack>
    </Stack>
  );
};
