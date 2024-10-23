import { Image, SimpleGrid, Modal, ModalOverlay, ModalContent, ModalBody, useDisclosure } from "@chakra-ui/react";
import useScreenshots from "../hooks/useScreenshots";
import { useState } from "react";

interface Props {
  gameId: number;
}

const GameScreenshots = ({ gameId }: Props) => {
  const { data, isLoading, error } = useScreenshots(gameId);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedImage, setSelectedImage] = useState("");

  if (isLoading) return null;
  if (error) throw error;

  const handleImageClick = (imageSrc: string) => {
    setSelectedImage(imageSrc);
    onOpen();
  };

  return (
    <>
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={2}>
        {data?.results.map((file) => (
          <Image
            key={file.id}
            src={file.image}
            onClick={() => handleImageClick(file.image)}
            cursor="pointer"
            _hover={{
              transform: "scale(1.05)",
            }}
            transition="transform .15s ease-in"  
          />
        ))}
      </SimpleGrid>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent bg="transparent" maxW="80rem" boxShadow="none">
          <ModalBody display="flex" justifyContent="center" alignItems="center">
            <Image src={selectedImage} objectFit="contain" />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default GameScreenshots;