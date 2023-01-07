import {
  Container,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  ModalProps,
} from "@chakra-ui/react";

export const PageModal = ({ isOpen, onClose, children }: ModalProps) => (
  <Modal isOpen={isOpen} onClose={onClose} size="full">
    <ModalOverlay />
    <ModalContent borderRadius="none">
      <ModalCloseButton
        zIndex="1"
        colorScheme="gray"
        size="lg"
        borderRadius="2px"
      />

      <ModalBody>
        <Container maxWidth={"full"} h={"calc(100vh - 18px)"}>
          {children}
        </Container>
      </ModalBody>
    </ModalContent>
  </Modal>
);
