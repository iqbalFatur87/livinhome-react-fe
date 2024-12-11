import { Button, HStack, Input, Stack, Text, useToast } from "@chakra-ui/react";
import { borderRadius, primaryTextColor, primaryTextTitleColor, secondaryTextColor } from "../../../../components/theme";
import { Link } from "react-router-dom";
import axios from "axios";
import { BASE_API } from "../../../../utils/constant/api";
import { useState } from "react";
import { DATA } from "../../../../utils/constant/localStorage";
import { encrypt } from "../../../../utils/helper/helper";

const FormAdmin = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [emailInput, setEmailInput] = useState<any>("");
  const [passwordInput, setPasswordInput] = useState<any>("");
  const toast = useToast();

  const login = async () => {
    setLoading(true);
    await axios
      .post(`${BASE_API}/auth/login/admin`, {
        // Mengganti endpoint ke login admin
        email: emailInput,
        password: passwordInput,
      })
      .then((res) => {
        toast({
          description: res.data.meta.message,
          status: "success",
          variant: "subtle",
          duration: 9000,
          isClosable: true,
        });

        const newLocalStorage = {
          TOKEN: `${res.data.meta.token_type} ${res.data.meta.access_token}`,
          ROLE: res.data.data[0], // Pastikan response data sesuai
          AVATAR: res.data.data[1], // Mengambil avatar dari response
        };
        localStorage[DATA] = encrypt(newLocalStorage);
        if (import.meta.env.VITE_MODE == "DEV") {
          localStorage.token = `${res.data.meta.token_type} ${res.data.meta.access_token}`;
        }

        setTimeout(() => {
          window.location.href = "/admin/dashboard"; // Mengarahkan user ke halaman dashboard admin
        }, 700);
      })
      .catch((e) => {
        const errorMessage = e.response?.data?.meta?.message || "Login gagal, periksa kembali data yang dimasukkan";
        toast({
          description: Array.isArray(errorMessage) ? errorMessage.join(", ") : errorMessage, // Handling array atau string error message
          status: "error",
          variant: "subtle",
          duration: 9000,
          isClosable: true,
        });
      });
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
      <form
        action=""
        onSubmit={(e) => {
          e.preventDefault();
          login(); // Memanggil fungsi login pada submit form
        }}
      >
        <Stack gap={"20px"} margin={"auto"}>
          <Text fontSize={"2xl"} fontWeight={"bold"} alignSelf={"center"} color={primaryTextColor()}>
            Login Admin
          </Text>
          <Input value={emailInput} onChange={(e) => setEmailInput(e.target.value)} borderRadius={borderRadius()} placeholder="Masukkan Email" />
          <Input
            value={passwordInput}
            onChange={(e) => setPasswordInput(e.target.value)}
            borderRadius={borderRadius()}
            placeholder="Kata Sandi"
            type="password"
          />
          <Button
            type="submit"
            color={"white"}
            backgroundColor={"black"}
            borderRadius={"30px"}
            size={"lg"}
            _hover={{ backgroundColor: "black" }}
            isLoading={loading} // Menampilkan loading spinner saat proses login
          >
            Masuk
          </Button>

          <HStack justifyContent={"space-between"}>
            <Link to={"/auth/reset-password"}>
              <Text color={secondaryTextColor()}>Lupa Kata Sandi</Text>
            </Link>
            <Link to={"/auth/register"}>
              <Text color={secondaryTextColor()}>Buat Akun</Text>
            </Link>
          </HStack>

          <Stack marginTop={"40px"}>
            <Text textAlign={"center"} lineHeight={"4"} fontSize={"sm"} color={primaryTextColor()}>
              Kami tidak akan memberikan informasi pribadi Anda kepada siapapun
            </Text>

            <HStack flexWrap={"wrap"} justifyContent={"center"} lineHeight={"4"} gap={"3px"} marginTop={"10px"}>
              <Text textAlign={"center"} fontSize={"sm"} color={primaryTextColor()}>
                Dengan masuk, Anda secara otomatis menyetujui
              </Text>
              <Text textAlign={"center"} fontSize={"sm"} color={primaryTextColor()} fontWeight={"bold"}>
                Syarat dan Ketentuan{" "}
              </Text>
              <Text textAlign={"center"} fontSize={"sm"} color={primaryTextColor()}>
                serta
              </Text>
              <Text textAlign={"center"} fontSize={"sm"} color={primaryTextColor()} fontWeight={"bold"}>
                Kebijakan Privasi
              </Text>
              <Text textAlign={"center"} fontSize={"sm"}>
                Livinhome.
              </Text>
            </HStack>
          </Stack>
          <Text
            onClick={() => props.setLoginState("Login Penyewa")}
            textAlign={"center"}
            fontSize={"sm"}
            color={primaryTextTitleColor()}
            fontWeight={"bold"}
            cursor={"pointer"}
          >
            Masuk sebagai Penyewa
          </Text>
        </Stack>
      </form>
    </Stack>
  );
};

export default FormAdmin;
