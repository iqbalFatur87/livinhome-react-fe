import {
  Button,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  Text,
} from "@chakra-ui/react";
import { primaryTextColor } from "../../../../components/theme";
import { useState } from "react";

const ModalKonfirmasi = (props: { isOpen: boolean; onOpen: any; onClose: any }) => {
  const [loading, setLoading] = useState(false);
  const [statusKonfirmasi, setStatusKonfirmasi] = useState<null | boolean>(null);
  const submit = async (statusKonfirmasiInput: boolean) => {
    setLoading(true);
    setTimeout(() => {
      setStatusKonfirmasi(statusKonfirmasiInput);
      setLoading(false);
    }, 2000);
  };

  return (
    <>
      {statusKonfirmasi !== null ? (
        <Modal
          isOpen={props.isOpen}
          onClose={() => {
            props.onClose();
            setStatusKonfirmasi(null);
          }}
          isCentered
        >
          <ModalOverlay />
          <ModalContent>
            <ModalHeader></ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Stack gap={"20px"} padding={"30px"}>
                <Image alignSelf={"center"} width={"163px"} src="/success-reset-password.png" />
                <Text textAlign={"center"} lineHeight={"4"} fontSize={"sm"} color={primaryTextColor()}>
                  {statusKonfirmasi ? "Konfirmasi Survei Berhasil Di kirim Ke Calon Penyewa" : "Penolakan Survei Berhasil Di kirim Ke Calon Penyewa"}
                </Text>
                <Button
                  onClick={() => {
                    props.onClose();
                    setStatusKonfirmasi(null);
                  }}
                  color={"white"}
                  backgroundColor={"black"}
                  _hover={{ backgroundColor: "black" }}
                >
                  Mengerti
                </Button>
              </Stack>
            </ModalBody>
          </ModalContent>
        </Modal>
      ) : (
        <Modal
          isOpen={props.isOpen}
          onClose={() => {
            props.onClose();
          }}
          isCentered
        >
          <ModalOverlay />
          <ModalContent>
            <ModalHeader></ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Stack justifyContent={"center"}>
                <Image alignSelf={"center"} width={"163px"} src="/konfirmasi-pengajuan-survei.png" />
                <Text fontWeight={"bold"} color={primaryTextColor()} textAlign={"center"} fontSize={"md"} marginBottom={"20px"}>
                  Apakah kamu yakin untuk mengkonfirmasi survei di jam 11.00 18 Agustus 2024?
                </Text>
              </Stack>
            </ModalBody>

            <ModalFooter>
              <Button
                onClick={() => {
                  submit(false);
                }}
                variant={"outline"}
                mr={3}
                isLoading={loading}
              >
                Tolak
              </Button>
              <Button
                onClick={() => {
                  submit(true);
                }}
                color={"white"}
                backgroundColor={"black"}
                _hover={{ backgroundColor: "black" }}
                isLoading={loading}
              >
                Konfirmasi
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      )}
    </>
  );
};

export default ModalKonfirmasi;
