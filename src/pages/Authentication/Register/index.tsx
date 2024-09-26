import { Image, Stack } from "@chakra-ui/react";
import { ChooseRole } from "./Components/ChooseRole";
import { useEffect, useState } from "react";
import { FormPenyewa } from "./Components/FormPenyewa";
import { FormPemilikProperti } from "./Components/FormPemilikProperti";
import { UnggahKTP } from "./Components/UnggahKTP";
import { REGISTER_TOKEN, SUCCESS_REGISTER } from "../../../utils/constant/localStorage";
import { Succesfully } from "./Components/Successfully";

const index = () => {
  const [registerState, setRegisterState] = useState<any>({
    currentState: "Choose Role",
  });
  const registerToken = localStorage.getItem(REGISTER_TOKEN);

  useEffect(() => {
    if (registerToken) {
      setRegisterState((prev: any) => ({
        ...prev,
        currentState: "Unggah KTP",
      }));
    } else {
      setRegisterState((prev: any) => ({
        ...prev,
        currentState: "Choose Role",
      }));
    }
  }, [registerToken]);

  useEffect(() => {
    if (localStorage[SUCCESS_REGISTER]) {
      setRegisterState((prev: any) => ({
        ...prev,
        currentState: "Success Register",
      }));
    }
  }, [localStorage[SUCCESS_REGISTER]]);

  return (
    <Stack width={"100vw"} height={"100vh"} alignItems={"center"} justifyContent={"center"}>
      <Stack width={"100%"} height={"100%"} position={"fixed"}>
        <Image width={"90%"} maxWidth={"483px"} src={"/bg-login-1.png"} position={"absolute"} zIndex={"1"} top={"0"} left={"0"} />
        <Image width={"90%"} maxWidth={"483px"} src={"/bg-login-2.png"} position={"absolute"} zIndex={"0"} bottom={"0"} right={"0"} />
      </Stack>

      {registerState.currentState == "Choose Role" ? (
        <ChooseRole registerState={registerState} setRegisterState={setRegisterState} />
      ) : registerState.currentState == "Form Penyewa" ? (
        <FormPenyewa setRegisterState={setRegisterState} />
      ) : registerState.currentState == "Form Pemilik Properti" ? (
        <FormPemilikProperti setRegisterState={setRegisterState} />
      ) : registerState.currentState == "Unggah KTP" ? (
        <UnggahKTP />
      ) : registerState.currentState == "Success Register" ? (
        <Succesfully />
      ) : null}
    </Stack>
  );
};

export default index;
