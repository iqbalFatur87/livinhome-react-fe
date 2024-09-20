import { Button, HStack, Image, ListItem, Stack, Text, UnorderedList, useToast } from "@chakra-ui/react";
import { borderRadius, primaryTextColor, secondaryTextColor } from "../../../../components/theme";
import { useCallback, useEffect, useRef, useState } from "react";
import axios from "axios";
import { useDropzone } from "react-dropzone";
import { REGISTER_TOKEN, REGISTER_UPLOAD, SUCCESS_REGISTER } from "../../../../utils/constant/localStorage";
import { TbCloudUpload } from "react-icons/tb";
import { BASE_API } from "../../../../utils/constant/api";

export const UnggahKTP = () => {
  const [preview, setPreview] = useState<any>(localStorage[REGISTER_UPLOAD]);
  const [loading, setLoading] = useState<boolean>(false);
  const toast = useToast();
  // const [hover, setHover] = useState<boolean>(false);

  const onDrop = useCallback(async (acceptedFiles: any) => {
    setLoading(true);
    const file = new FileReader();
    file.readAsDataURL(acceptedFiles[0]);
    if (!file) {
      return;
    }
    var formData = new FormData();
    formData.append("image", acceptedFiles[0]);
    const fileType = acceptedFiles[0].type;

    if (fileType.includes("image")) {
      await axios
        .post(
          `${BASE_API}/auth/upload-ktp/owner`,

          formData,
          {
            headers: {
              Accept: "application/json",
              Authorization: localStorage[REGISTER_TOKEN],
              "Content-Type": "multipart/form-data",
            },
          }
        )

        .then(async (res: any) => {
          setPreview(res.data.data);
          localStorage[REGISTER_UPLOAD] = res.data.data;
          localStorage[SUCCESS_REGISTER] = true;
          setLoading(false);
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
    } else {
      toast({
        title: `Hanya dapat mengunggah file gambar`,
        status: "error",
        duration: 2500,
        variant: "subtle",
        isClosable: true,
      });
      setLoading(false);
    }
  }, []);

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  const [marginTop, setMarginTop] = useState("150px");
  const stackRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const handleResize = () => {
      if (stackRef.current) {
        const height = stackRef.current.clientHeight;
        if (height < window.innerHeight) {
          setMarginTop("0px");
        } else {
          setMarginTop("100px");
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
  return (
    <Stack
      width={{ md: "100%", base: "95%" }}
      maxWidth={"830px"}
      boxShadow={"rgba(99, 99, 99, 0.2) 0px 2px 8px 0px"}
      borderRadius={"50px"}
      paddingX={{ base: "30px", md: "75px" }}
      paddingY={"40px"}
      backgroundColor={"white"}
      zIndex={"2"}
      gap={"40px"}
      ref={stackRef}
      marginTop={marginTop}
    >
      <UnorderedList>
        <ListItem>Pastikan pencahayaan cukup pada saat pengambilan foto KTP (tidak terlalu terang atau terlalu gelap)</ListItem>
        <ListItem>Pastikan kamu menggunakan koneksi internet yang stabil</ListItem>
        <ListItem>Pastikan foto KTP tidak terpotong ataupun rusak</ListItem>
        <ListItem>Pastikan foto KTP terbaca dengan jelas (tidak buram)</ListItem>
        <ListItem>Pastikan foto KTP sesuai dengan KTP fisiknya (tidak diedit)</ListItem>
        <ListItem>Pastikan kamu menggunakan foto KTP asli (bukan fotokopi KTP)</ListItem>
      </UnorderedList>

      <Text fontSize={"2xl"} fontWeight={"bold"} alignSelf={"center"} color={primaryTextColor()}>
        Unggah Foto KTP
      </Text>
      <Stack
        boxShadow={"rgba(99, 99, 99, 0.2) 0px 2px 8px 0px"}
        borderRadius={"30px"}
        width={"100%"}
        aspectRatio={"16/9"}
        justifyContent={"center"}
        alignItems={"center"}
        {...getRootProps()}
      >
        <input {...getInputProps()} />

        {preview ? (
          <Image
            margin={"auto"}
            maxWidth={"100%"}
            height={"100%"}
            objectFit={"contain"}
            src={preview}
            borderRadius={borderRadius()}
            // onMouseEnter={() => setHover(true)}
          />
        ) : loading ? (
          <Button margin={"auto"} isLoading></Button>
        ) : (
          <Stack fontSize={"28px"} margin={"auto"} justifyContent={"center"} alignItems={"center"}>
            <TbCloudUpload />
            <Button
              type="submit"
              color={"white"}
              backgroundColor={"black"}
              borderRadius={"30px"}
              size={"md"}
              _hover={{ backgroundColor: "black" }}
              width={"150px"}
            >
              Pilih File
            </Button>
            <Text textAlign={"center"} lineHeight={"4"} fontSize={"sm"} color={secondaryTextColor()}>
              atau drag file kesini
            </Text>
          </Stack>
        )}
      </Stack>

      <HStack justifyContent={"space-between"} width={"100%"}>
        {localStorage[REGISTER_UPLOAD] && localStorage[REGISTER_TOKEN] ? null : (
          <Button
            borderRadius={"16"}
            colorScheme="yellow"
            onClick={() => {
              localStorage.removeItem(REGISTER_TOKEN);
              window.location.reload();
            }}
          >
            Kembali
          </Button>
        )}

        {/* {preview ? (
          <Link to={"/auth/login"}>
            <Button
              borderRadius={"16"}
              colorScheme="blue"
              onClick={() => {
                localStorage.removeItem(REGISTER_TOKEN);
                localStorage.removeItem(REGISTER_UPLOAD);
              }}
            >
              Lanjutkan
            </Button>
          </Link>
        ) : null} */}
      </HStack>
    </Stack>
  );
};
