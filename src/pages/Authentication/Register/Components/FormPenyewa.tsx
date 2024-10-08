import { Button, HStack, Input, Radio, RadioGroup, Stack, Text, useToast } from "@chakra-ui/react";
import { borderRadius, primaryTextColor, primaryTextTitleColor, secondaryTextColor } from "../../../../components/theme";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { BASE_API } from "../../../../utils/constant/api";
import { SUCCESS_REGISTER } from "../../../../utils/constant/localStorage";

export const FormPenyewa = (props: { setRegisterState: any }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [jenisKelaminInput, setJenisKelaminInput] = useState<any>(null);
  const [namaLengkapInput, setNamaLengkapInput] = useState<any>(null);
  const [emailInput, setEmailInput] = useState<any>(null);
  const [tanggalInput, setTanggalInput] = useState<any>(null);
  const [noHandphone, setNoHandphone] = useState<any>(null);
  const [passwordInput, setPasswordInput] = useState<any>(null);

  const [marginTop, setMarginTop] = useState("150px");
  const stackRef = useRef<HTMLDivElement | null>(null);
  const toast = useToast();

  useEffect(() => {
    const handleResize = () => {
      if (stackRef.current) {
        const height = stackRef.current.clientHeight;
        if (height < window.innerHeight) {
          setMarginTop("0px");
        } else {
          setMarginTop("150px");
        }
      }
    };

    // Check on mount
    handleResize();

    // Add resize listener
    window.addEventListener("resize", handleResize);

    // Clean up listener on unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const register = async () => {
    setLoading(true);
    await axios
      .post(`${BASE_API}/auth/register/renter`, {
        fullname: namaLengkapInput,
        gender: jenisKelaminInput,
        email: emailInput,
        date_of_birth: new Date(tanggalInput).getTime(),
        phone_number: noHandphone,
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
        localStorage[SUCCESS_REGISTER] = true;
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
    setLoading(true);
  };
  return (
    <Stack
      ref={stackRef}
      width={{ md: "100%", base: "95%" }}
      maxWidth={"530px"}
      boxShadow={"rgba(99, 99, 99, 0.2) 0px 2px 8px 0px"}
      borderRadius={"50px"}
      paddingX={{ base: "30px", md: "75px" }}
      paddingY={"40px"}
      backgroundColor={"white"}
      zIndex={"2"}
      marginTop={marginTop}
    >
      <form
        action=""
        onSubmit={(e) => {
          e.preventDefault();
          register();
        }}
      >
        <Stack gap={"20px"} margin={"auto"}>
          <Text fontSize={"2xl"} fontWeight={"bold"} alignSelf={"center"} color={primaryTextColor()}>
            Buat Akun Penyewa
          </Text>
          <Input
            value={namaLengkapInput}
            onChange={(e) => setNamaLengkapInput(e.target.value)}
            borderRadius={borderRadius()}
            placeholder="Nama Lengkap"
          />
          <Input value={emailInput} onChange={(e) => setEmailInput(e.target.value)} borderRadius={borderRadius()} placeholder="Email" />
          <RadioGroup onChange={setJenisKelaminInput} value={jenisKelaminInput}>
            <Stack direction="row">
              <Radio value="1">Laki-laki</Radio>
              <Radio value="0">Perempuan</Radio>
            </Stack>
          </RadioGroup>
          <HStack justifyContent={"space-between"}>
            <Text color={secondaryTextColor()}>Tanggal</Text>
            <Input value={tanggalInput} onChange={(e) => setTanggalInput(e.target.value)} type="date" borderRadius={borderRadius()} />
          </HStack>

          <Input value={noHandphone} onChange={(e) => setNoHandphone(e.target.value)} borderRadius={borderRadius()} placeholder="No Handphone" />
          <Input
            value={passwordInput}
            onChange={(e) => setPasswordInput(e.target.value)}
            borderRadius={borderRadius()}
            placeholder="Kata Sandi"
            type="password"
          />
          {/* <Input
            borderRadius={borderRadius()}
            placeholder="Ulang Kata Sandi"
            type="password"
          /> */}

          <Stack marginTop={"40px"}>
            <Text textAlign={"center"} lineHeight={"4"} fontSize={"sm"} color={primaryTextColor()}>
              Penting untuk Memahami Ketentuan Kami. Mohon Setujui Syarat dan Ketentuan Livinhome.Saya telah membaca dan menyetujui Syarat dan
              Ketentuan Livinhome
            </Text>

            <HStack flexWrap={"wrap"} justifyContent={"center"} lineHeight={"4"} gap={"3px"} marginTop={"10px"}>
              <Text textAlign={"center"} fontSize={"sm"} color={primaryTextColor()}>
                Saya telah membaca dan menyetujui
              </Text>
              <Text textAlign={"center"} fontSize={"sm"} color={primaryTextColor()} fontWeight={"bold"}>
                Syarat dan Ketentuan
              </Text>
              <Text textAlign={"center"} fontSize={"sm"} color={primaryTextColor()}>
                Livinhome
              </Text>
            </HStack>
          </Stack>

          {jenisKelaminInput && namaLengkapInput && emailInput && tanggalInput && noHandphone && passwordInput ? (
            <Button
              type="submit"
              color={"white"}
              backgroundColor={"black"}
              borderRadius={"30px"}
              size={"lg"}
              _hover={{ backgroundColor: "black" }}
              isLoading={loading}
              // onClick={() => props.setRegisterState("Unggah KTP")}
            >
              Daftar
            </Button>
          ) : null}

          <HStack flexWrap={"wrap"} justifyContent={"center"} lineHeight={"4"} gap={"5px"} marginTop={"10px"}>
            <Text textAlign={"center"} fontSize={"sm"} color={primaryTextColor()}>
              Akun kamu sudah terdaftar?
            </Text>
            <Link to={"/auth/login"}>
              <Text textAlign={"center"} fontSize={"sm"} color={primaryTextColor()} fontWeight={"bold"}>
                Masuk sini
              </Text>
            </Link>
          </HStack>
          <Text
            onClick={() =>
              props.setRegisterState((prev: any) => ({
                ...prev,
                currentState: "Form Pemilik Properti",
              }))
            }
            textAlign={"center"}
            fontSize={"sm"}
            color={primaryTextTitleColor()}
            fontWeight={"bold"}
            cursor={"pointer"}
          >
            Buat Akun sebagai Pemilik Properti
          </Text>
        </Stack>
      </form>
    </Stack>
  );
};
