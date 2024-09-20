import {
  Input,
  InputGroup,
  InputLeftElement,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
} from "@chakra-ui/react";
import {
  backgroundContainer,
  customBorder,
  borderRadius,
  inputBackgroundColor,
  inputColor,
  secondaryTextColor,
} from "./theme";
import { FaSearch } from "react-icons/fa";

const Pencarian = (props: { isOpen: any; onClose: any }) => {
  return (
    <Modal isOpen={props.isOpen} onClose={props.onClose}>
      <ModalOverlay backdropFilter={"blur(20px)"} />
      <ModalContent
        backgroundColor={backgroundContainer()}
        borderRadius={borderRadius()}
        border={customBorder()}
      >
        <ModalBody padding={"10px"}>
          <InputGroup>
            <InputLeftElement pointerEvents="none" color={secondaryTextColor()}>
              <FaSearch />
            </InputLeftElement>
            <Input
              backgroundColor={inputBackgroundColor()}
              border={customBorder()}
              color={inputColor()}
              placeholder="Cari"
            />
          </InputGroup>
        </ModalBody>
      </ModalContent>
      ;
    </Modal>
  );
};

export default Pencarian;
