import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Stack,
  Text,
  useToast
} from "@chakra-ui/react";
import {useCallback, useState} from "react";
import {secondaryTextColor} from "../../../../components/theme";
import {TbCloudUpload} from "react-icons/tb";
import {useDropzone} from "react-dropzone";
import {AxiosError} from "axios";
import {apiOwnerProfileUpdateProfilePhoto} from "../../../../api/profile.ts";
import {useNavigate} from "react-router-dom";

const ModalUpdatePhotoProfil = ({ onClose }: { onClose: () => void }) => {
  const toast = useToast();
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    setLoading(true);

    // Ambil file pertama dari acceptedFiles
    const profileImg = acceptedFiles[0];

    if (!profileImg) {
      setLoading(false);
      return;
    }

    try {
      await apiOwnerProfileUpdateProfilePhoto(profileImg);

      toast({
        title: "Berhasil ubah foto profil",
        status: "success",
        duration: 9000,
        variant: "subtle",
        isClosable: true,
      });

      navigate(0);
    } catch (error) {
      if (error instanceof AxiosError) {
        toast({
          description: error.response?.data?.meta?.message?.join(", ") || "Upload failed",
          status: "error",
          duration: 9000,
          variant: "subtle",
          isClosable: true,
        });
        return;
      }

      toast({
        description: "Kesalahan server saat mengupload foto",
        status: "error",
        duration: 9000,
        variant: "subtle",
        isClosable: true,
      });
    } finally {
      setLoading(false)
    }

  }, [navigate, toast]);

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <Modal isOpen={true} onClose={() => onClose()} isCentered>
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
