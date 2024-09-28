import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Text } from "@chakra-ui/react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  gameName: string;
}

const Recommender = ({ isOpen, onClose, gameName }: Props) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent maxW="60rem">
        <ModalHeader>More games like <Text as="span" color="yellow.400">{gameName}</Text>:</ModalHeader>
        <ModalBody>
          <p>Coming soon...</p>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="purple" size="sm" fontWeight="bold" onClick={onClose}>Close</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default Recommender;
