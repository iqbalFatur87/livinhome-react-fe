import { Image, Stack } from "@chakra-ui/react";
import { useState } from "react";
import { FormPenyewa } from "./Components/FormPenyewa";
import { FormPemilikProperti } from "./Components/FormPemilikProperti";
import { ChooseRole } from "./Components/ChooseRole";

const index = () => {
  const [loginState, setLoginState] = useState<string>("Choose Role");
  // const login = async () => {
  //   await axios
  //     .post(`${BASE_API}/auth/login`, {
  //       username: usernameInput,
  //       password: passwordInput,
  //     })
  //     .then((res) => {
  //       localStorage.setItem(TOKEN, res.data.data[TOKEN]);
  //       navigate(0);
  //       toast({
  //         description: res.data.message,
  //         status: "success",
  //         variant: "subtle",
  //         duration: 9000,
  //         isClosable: true,
  //       });
  //     })
  //     .catch((e) => {
  //       toast({
  //         description: e.response.data,
  //         status: "error",
  //         variant: "subtle",
  //         duration: 9000,
  //         isClosable: true,
  //       });
  //     });
  // };
  return (
    <Stack
      width={"100vw"}
      height={"100vh"}
      alignItems={"center"}
      justifyContent={"center"}
    >
      <Image
        width={"90%"}
        maxWidth={"483px"}
        src={"/bg-login-1.png"}
        position={"absolute"}
        zIndex={"1"}
        top={"0"}
        left={"0"}
      />
      <Image
        width={"90%"}
        maxWidth={"483px"}
        src={"/bg-login-2.png"}
        position={"absolute"}
        zIndex={"0"}
        bottom={"0"}
        right={"0"}
      />

      {loginState == "Choose Role" ? (
        <ChooseRole setLoginState={setLoginState} />
      ) : loginState == "Login Penyewa" ? (
        <FormPenyewa />
      ) : loginState == "Login Pemilik Properti" ? (
        <FormPemilikProperti />
      ) : null}
      {/* <FormPenyewa /> */}
    </Stack>
  );
};

export default index;
