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
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { BASE_API } from "../../../../../utils/constant/api";
import { authorityCheck, AUTHORIZATION_HEADERS } from "../../../../../utils/helper/helper";
import axios from "axios";

const ModalTolak = (props: { id: any; isOpen: boolean; onOpen: any; onClose: any; setModalType: any }) => {
  const navigate = useNavigate();
  const [paymentSucces, setPaymentSuccess] = useState<boolean>(false);
  const toast = useToast();
  const [loading, setLoading] = useState(false);
  const submit = async () => {
    setLoading(true);
    await axios
      .post(
        `${BASE_API}/pengajuan/decline`,
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
  return paymentSucces ? (
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
              Pengajuan telah di decline
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
            Apakah kamu yakin untuk menolak pengajuan sewa ini?
          </Text>
          <Text fontWeight={"bold"} color={secondaryTextColor()} textAlign={"center"} fontSize={"sm"}>
            Pastikan sudah membaca semua data penyewa sebelum konfirmasi
          </Text>
        </ModalBody>

        <ModalFooter>
          <Button variant={"outline"} mr={3} onClick={props.onClose}>
            Kembali
          </Button>
          <Button onClick={submit} color={"white"} backgroundColor={"black"} _hover={{ backgroundColor: "black" }} isLoading={loading}>
            Tolak
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ModalTolak;
