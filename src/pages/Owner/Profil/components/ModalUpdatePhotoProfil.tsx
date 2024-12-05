import { Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Stack, Text, useToast } from "@chakra-ui/react";
import { useCallback, useState } from "react";
import { secondaryTextColor } from "../../../../components/theme";
import { TbCloudUpload } from "react-icons/tb";
import { useDropzone } from "react-dropzone";
import axios from "axios";
import { BASE_API } from "../../../../utils/constant/api";
import { authorityCheck, AUTHORIZATION_HEADERS } from "../../../../utils/helper/helper";

const ModalUpdatePhotoProfil = (props: { getData: () => void; onClose: () => void }) => {
  const toast = useToast();
  const [loading, setLoading] = useState<boolean>(false);

  const onDrop = useCallback(async (acceptedFiles: any) => {
    setLoading(true);

    // Ambil file pertama dari acceptedFiles
    const file = acceptedFiles[0];

    if (!file) {
      setLoading(false);
      return;
    }

    // Membaca file sebagai Base64
    const reader = new FileReader();
    reader.onloadend = async () => {
      const base64Data: any = reader.result; // Ini adalah string Base64

      const formData = new FormData();
      formData.append("image", base64Data); // Mengirim Base64

      const fileType = file.type;

      if (fileType.includes("image")) {
        try {
          await axios.post(`${BASE_API}/profile/owner/update-image`, formData, AUTHORIZATION_HEADERS);
          toast({
            title: "Berhasil ubah foto profil",
            status: "success",
            duration: 9000,
            variant: "subtle",
            isClosable: true,
          });
          props.onClose();
          props.getData();
        } catch (error: any) {
          authorityCheck(error.response.status);
          toast({
            description: error.response?.data?.meta?.message?.join(", ") || "Upload failed",
            status: "error",
            duration: 9000,
            variant: "subtle",
            isClosable: true,
          });
        } finally {
          setLoading(false);
        }
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
    };

    reader.readAsDataURL(file); // Membaca file sebagai data URL (Base64)
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
