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
  useToast,
} from "@chakra-ui/react";
import { primaryTextColor, secondaryTextColor } from "../../../../../components/theme";
import axios from "axios";
import { BASE_API } from "../../../../../utils/constant/api";
import { authorityCheck, AUTHORIZATION_HEADERS } from "../../../../../utils/helper/helper";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const ModalKonfirmasi = (props: { id: any | string; isOpen: boolean; onOpen: any; onClose: any; setModalType: any }) => {
  const [paymentSucces, setPaymentSuccess] = useState<boolean>(false);
  const navigate = useNavigate();
  const toast = useToast();
  const [loading, setLoading] = useState(false);
  const submit = async () => {
    setLoading(true);
    await axios
      .post(
        `${BASE_API}/pengajuan/accept`,
        {
          transaction_id: props.id,
        },
        AUTHORIZATION_HEADERS
      )
      .then(() => {
        setPaymentSuccess(true);
      })
      .catch((e) => {
        authorityCheck(e.response.status);
        toast({
          description: e.response.data.meta.message.join(", "),
          status: "error",
          variant: "subtle",
          duration: 9000,
          isClosable: true,
        });
      });

    setLoading(false);
  };
  return (
    <>
      {paymentSucces ? (
        <Modal
          isOpen={props.isOpen}
          onClose={() => {
            navigate("/owner/pengajuan-sewa/list");
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
                  Selamat Pembayaran Dari Calon Penyewa Berhasil
                </Text>
              </Stack>
            </ModalBody>
          </ModalContent>
        </Modal>
      ) : (
        <Modal
          isOpen={props.isOpen}
          onClose={() => {
            props.setModalType(null);
            props.onClose();
          }}
          isCentered
        >
          <ModalOverlay />
          <ModalContent>
            <ModalHeader></ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Text fontWeight={"bold"} color={primaryTextColor()} textAlign={"center"} fontSize={"md"} marginBottom={"20px"}>
                Apakah kamu yakin untuk mengkonfirmasi pengajuan sewa ini?
              </Text>
              <Text fontWeight={"bold"} color={secondaryTextColor()} textAlign={"center"} fontSize={"sm"}>
                Pastikan sudah membaca semua data penyewa sebelum konfirmasi
              </Text>
            </ModalBody>

            <ModalFooter>
              <Button variant={"outline"} mr={3} onClick={props.onClose}>
                Kembali
              </Button>
              <Button
                // onClick={() => navigate("/owner/pengajuan-sewa/konfirmasi-pengajuan-sewa")}
                onClick={submit}
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
