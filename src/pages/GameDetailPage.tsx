import { useNavigate, useParams } from "react-router-dom";
import useGame from "../hooks/useGame";
import { Box, Button, GridItem, Heading, SimpleGrid, Spinner, useDisclosure } from "@chakra-ui/react";
import ExpandableText from "../components/ExpandableText";
import GameAttributes from "../components/GameAttributes";
import GameTrailer from "../components/GameTrailer";
import GameScreenshots from "../components/GameScreenshots";
import Recommender from "../components/Recommender";

const GameDetailPage = () => {
  const { slug } = useParams();
  const { data: game, isLoading, error } = useGame(slug!); // This constant will never be null
  const navigate = useNavigate(); // Initialize useNavigate

  const { isOpen, onOpen, onClose } = useDisclosure(); // Chakra UI hook to handle modal state

  if (isLoading) return (
    <Spinner
      thickness='4px'
      speed='0.65s'
      emptyColor='gray.100'
      color='purple.200'
      size='xl'      
    />
    );

  if (error || !game) throw error;

  return (
    <>
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={5}>
        <GridItem>
          <Heading>{game.name}</Heading>
          <ExpandableText>{game.description_raw}</ExpandableText>
          <GameAttributes game={game}/>
          <Button 
            size="sm" 
            fontWeight="bold" 
            colorScheme="yellow" 
            onClick={onOpen}
          >
            More Games Like This
          </Button>
        </GridItem>

        <GridItem>
          <GameTrailer gameId={game.id} />
          <GameScreenshots gameId={game.id} />
        </GridItem>
      </SimpleGrid>

      <Recommender isOpen={isOpen} onClose={onClose} gameName={game.name} />

      <Button
        position="fixed"
        bottom="1rem"
        left="1rem"
        onClick={() => navigate(-1)}
        size="sm"
        fontWeight="bold"
        colorScheme="purple"
      >
        Go Back
      </Button>
    </>
  );
};

export default GameDetailPage;
