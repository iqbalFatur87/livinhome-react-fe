import { Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text } from "@chakra-ui/react";
import { primaryTextColor, secondaryTextColor } from "../../../../components/theme";

const ModalKonfirmasi = (props: { isOpen: boolean; onOpen: any; onClose: any }) => {
  return (
    <Modal isOpen={props.isOpen} onClose={props.onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader></ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text fontWeight={"bold"} color={primaryTextColor()} textAlign={"center"} fontSize={"md"}>
            Apakah kamu yakin untuk mengkonfirmasi pengajuan sewa ini?
          </Text>
          <Text fontWeight={"bold"} color={secondaryTextColor()} textAlign={"center"} fontSize={"sm"}>
            Apakah kamu yakin untuk mengkonfirmasi pengajuan sewa ini?
          </Text>
        </ModalBody>

        <ModalFooter>
          <Button variant={"outline"} mr={3} onClick={props.onClose}>
            Kembali
          </Button>
          <Button color={"white"} backgroundColor={"black"} _hover={{ backgroundColor: "black" }}>
            Konfirmasi
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ModalKonfirmasi;
