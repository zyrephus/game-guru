import { Box, Button, Heading, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <Box
      height="calc(100vh - 120px)"
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      px={6}
      textAlign="center"
    >
      <Heading as="h1" size="2xl" mb={4} fontWeight="bold">
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
        colorScheme="yellow"
      >
        Explore Now
      </Button>
    </Box>
  );
};

export default HomePage;
