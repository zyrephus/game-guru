import { Box, Button, Heading, Image, SimpleGrid, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import MacBook from "../assets/MacBook.png"

const HomePage = () => {
  return (
    <SimpleGrid columns={{ base: 1, md: 2 }}>
      <Box
        height="calc(100vh - 120px)"
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        px={6}
        textAlign="center"
      >
        <Heading 
          as="h1" size="2xl" 
          mb={4} fontWeight="bold" 
          color="#D6BCFA"  
          _hover={{ color: "#B794F4" }}
          transition="color 0.3s"
        >
          Welcome to Game Guru
        </Heading>

        <Text fontSize="xl" mb={8} maxW="600px">
          Discover your next favorite game with Game Guru. Explore a vast library
          of indie titles, classic RPGs, and trending multiplayer games through a
          clean, intuitive interface.
        </Text>

        <Button
          as={Link}
          to="/explore"
          size="lg"
          fontWeight="bold"
          colorScheme="purple"
        >
          Explore Now
        </Button>
      </Box>
      
      <Box
        height="calc(100vh - 120px)"
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        px={6}
        textAlign="center"
      >
        <Image 
          key={1}
          src={MacBook}
        />
      </Box>
      
    </SimpleGrid>
  );
};

export default HomePage;
