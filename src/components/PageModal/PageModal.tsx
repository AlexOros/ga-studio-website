import {
  Box,
  Container,
  Icon,
  IconButton,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  ModalProps,
} from "@chakra-ui/react";
import { RiCloseFill } from "react-icons/ri";

export const PageModal = ({ isOpen, onClose, children }: ModalProps) => (
  <Modal isOpen={isOpen} onClose={onClose} size="full">
    <ModalOverlay />
    <ModalContent borderRadius="none">
      <Box
        position="absolute"
        display="flex"
        justifyContent="end"
        width="full"
        p={2}
      >
        <IconButton
          variant="ghost"
          onClick={onClose}
          aria-label="close menu button"
        >
          <Icon fontSize="2xl" as={RiCloseFill} />
        </IconButton>
      </Box>

      <ModalBody>
        <Container maxWidth={"full"} h={"calc(100vh - 16px)"}>
          {children}
        </Container>
      </ModalBody>
    </ModalContent>
  </Modal>
);
