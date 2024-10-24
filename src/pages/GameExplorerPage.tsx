import { Grid, Show, GridItem, Box, Flex } from "@chakra-ui/react";
import GameGrid from "../components/GameGrid";
import GameHeading from "../components/GameHeading";
import GenreList from "../components/GenreList";
import PlatformSelector from "../components/PlatformSelector";
import SortSelector from "../components/SortSelector";
import { useEffect, useState } from "react";

const GameExplorerPage = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    // Define a function to update the mouse position state
    const updateMousePosition = (ev: MouseEvent) => {
      setMousePosition({ x: ev.clientX, y: ev.clientY });
    };

    // Add an event listener for the 'mousemove' event when the component mounts
    window.addEventListener('mousemove', updateMousePosition);

    // Cleanup function to remove the event listener when the component unmounts
    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
    };
  }, []);
  
  return (
    <Grid
      templateAreas={{
        base: `"main"`,
        lg: `"nav nav" "aside main"`,
      }}
      templateColumns={{
        base: "1fr",
        lg: "200px 1fr",
      }}
    >
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
      <Show above="lg">
        <GridItem area="aside" paddingX={5}>
          <GenreList />
        </GridItem>
      </Show>
      <GridItem area="main">
        <Box paddingLeft={2}>
          <GameHeading />
          <Flex marginBottom={5}>
            <Box marginRight={5}>
              <PlatformSelector />
            </Box>
            <SortSelector />
          </Flex>
        </Box>
        <GameGrid />
      </GridItem>
    </Grid>
  );
};

export default GameExplorerPage;
