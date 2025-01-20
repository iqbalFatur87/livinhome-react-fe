import {Image, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay} from "@chakra-ui/react";

type ModalBuktiTransaksiProps = {
    isOpen: boolean;
    onClose: () => void;
    proofUrl: string | null;
}

export function ModalBuktiTransaksi({ onClose, isOpen, proofUrl }: ModalBuktiTransaksiProps) {
    if (!proofUrl) return null;

    return <Modal
        isOpen={isOpen}
        onClose={onClose}
        isCentered
    >
        <ModalOverlay />
        <ModalContent>
            <ModalHeader>
                <ModalCloseButton />
            </ModalHeader>

            <ModalBody>
                <Image
                    src={proofUrl}
                    alt="Bukti Transaksi"
                    aspectRatio={"4/3"}
                    objectFit={"cover"}
                />
            </ModalBody>
        </ModalContent>
    </Modal>
}