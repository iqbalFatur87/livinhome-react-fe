import { Image, Stack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { PhoneVerification } from "./Components/PhoneVerification";
import { CreateNewPassword } from "./Components/CreateNewPassword";
import { Succesfully } from "./Components/Successfully";
import { EMAIL_VERIFICATION, OTP_VERIFICATION, PHONE_VERIVICATION, SUCCESS_RESET_PASSWORD } from "../../../utils/constant/localStorage";
import { CodeVerification } from "./Components/CodeVerification";

const index = () => {
  const [resetPasswordState, setResetPasswordState] = useState("Phone Verification");
  useEffect(() => {
    if (localStorage[EMAIL_VERIFICATION] || localStorage[PHONE_VERIVICATION]) {
      setResetPasswordState("Code Verification");
    }
  }, [localStorage[EMAIL_VERIFICATION], localStorage[PHONE_VERIVICATION]]);

  useEffect(() => {
    if ((localStorage[PHONE_VERIVICATION] || localStorage[EMAIL_VERIFICATION]) && localStorage[OTP_VERIFICATION]) {
      setResetPasswordState("Create New Password");
    }
  }, [localStorage[PHONE_VERIVICATION], localStorage[EMAIL_VERIFICATION], localStorage[OTP_VERIFICATION]]);

  useEffect(() => {
    if (
      (localStorage[PHONE_VERIVICATION] || localStorage[EMAIL_VERIFICATION]) &&
      localStorage[OTP_VERIFICATION] &&
      localStorage[SUCCESS_RESET_PASSWORD]
    ) {
      setResetPasswordState("Success Reset Password");
    } else if (
      !localStorage[PHONE_VERIVICATION] &&
      !localStorage[EMAIL_VERIFICATION] &&
      !localStorage[OTP_VERIFICATION] &&
      !localStorage[SUCCESS_RESET_PASSWORD]
    ) {
      setResetPasswordState("Phone Verification");
    }
  }, [localStorage[PHONE_VERIVICATION], localStorage[EMAIL_VERIFICATION], localStorage[OTP_VERIFICATION], localStorage[SUCCESS_RESET_PASSWORD]]);

  return (
    <Stack width={"100vw"} height={"100vh"} alignItems={"center"} justifyContent={"center"}>
      <Image width={"90%"} maxWidth={"483px"} src={"/bg-login-1.png"} position={"absolute"} zIndex={"1"} top={"0"} left={"0"} />
      <Image width={"90%"} maxWidth={"483px"} src={"/bg-login-2.png"} position={"absolute"} zIndex={"0"} bottom={"0"} right={"0"} />

      {resetPasswordState == "Phone Verification" ? (
        <PhoneVerification />
      ) : resetPasswordState == "Code Verification" ? (
        <CodeVerification />
      ) : resetPasswordState == "Create New Password" ? (
        <CreateNewPassword />
      ) : resetPasswordState == "Success Reset Password" ? (
        <Succesfully />
      ) : null}
    </Stack>
  );
};

export default index;
