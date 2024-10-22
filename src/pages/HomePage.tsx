import React, { useState, useEffect } from "react";
import { Box, Button, Heading, Image, SimpleGrid, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import MacBook from "../assets/MacBook.png";

const HomePage = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const updateMousePosition = (ev: MouseEvent) => {
      setMousePosition({ x: ev.clientX, y: ev.clientY });
    };

    window.addEventListener('mousemove', updateMousePosition);

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
    };
  }, []);

  return (
    <Box position="relative">
      <Box
        position="fixed"
        top="50%"
        left="50%"
        width="1200px"
        height="1200px"
        borderRadius="50%"
        background="radial-gradient(circle, rgba(128, 90, 213, 0.1) 0%, rgba(128, 90, 213, 0.03) 40%, rgba(128, 90, 213, 0) 70%)"
        pointerEvents="none"
        zIndex={-1}
        transform={`translate(${mousePosition.x - window.innerWidth / 2 - 600}px, ${mousePosition.y - window.innerHeight / 2 - 600}px)`}
        transition="transform 0.1s ease-out"
      />

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
    </Box>
  );
};

export default HomePage;