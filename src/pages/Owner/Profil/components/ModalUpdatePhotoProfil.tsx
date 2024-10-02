import { Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Stack, Text, useToast } from "@chakra-ui/react";
import { useCallback, useState } from "react";
import { secondaryTextColor } from "../../../../components/theme";
import { TbCloudUpload } from "react-icons/tb";
import { useDropzone } from "react-dropzone";
import axios from "axios";
import { BASE_API } from "../../../../utils/constant/api";
import { authorityCheck, AUTHORIZATION_HEADERS } from "../../../../utils/helper/helper";

const ModalUpdatePhotoProfil = (props: { onClose: () => void }) => {
  const toast = useToast();
  const [loading, setLoading] = useState<boolean>(false);

  const onDrop = useCallback(async (acceptedFiles: any) => {
    setLoading(true);
    const file = new FileReader();
    // file.onload = function () {
    //   setPreview(file.result);
    // };
    file.readAsDataURL(acceptedFiles[0]);
    if (!file) {
      return;
    }
    var formData = new FormData();
    formData.append("image", acceptedFiles[0]);
    const fileType = acceptedFiles[0].type;

    if (fileType.includes("image")) {
      await axios
        .post(`${BASE_API}/profile/owner/update-image`, formData, AUTHORIZATION_HEADERS)
        .then(() => {
          toast({
            title: "Berhasil ubah foto profil",
            status: "success",
            duration: 9000,
            variant: "subtle",
            isClosable: true,
          });
          props.onClose();
          setLoading(false);
        })
        .catch((error) => {
          authorityCheck(error.response.status);
          toast({
            description: error.response?.data?.meta?.message?.join(", ") || "Upload failed",
            status: "error",
            duration: 9000,
            variant: "subtle",
            isClosable: true,
          });
          setLoading(false);
        });
    } else {
      toast({
        title: `Hanya dapat mengunggah file gambar`,
        status: "error",
        duration: 9000,
        variant: "subtle",
        isClosable: true,
      });
      setLoading(false);
    }
  }, []);

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <Modal isOpen={true} onClose={() => props.onClose()} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Update Photo Profil</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
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

            {loading ? (
              <Button margin={"auto"} isLoading></Button>
            ) : (
              <Stack fontSize={"28px"} margin={"auto"} justifyContent={"center"} alignItems={"center"}>
                <TbCloudUpload />
                <Button
                  type="button"
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
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default ModalUpdatePhotoProfil;
