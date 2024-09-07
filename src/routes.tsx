import { Box, Button, Heading, Text } from "@chakra-ui/react";
import { createBrowserRouter, Link } from "react-router-dom";
import ErrorPage from "./pages/ErrorPage";
import GameDetailPage from "./pages/GameDetailPage";
import GameExplorerPage from "./pages/GameExplorerPage";
import Layout from "./pages/Layout";

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
        Discover your next favorite game with Game Guru. Explore a vast library of indie titles, classic RPGs, and trending multiplayer games through a clean, intuitive interface.
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

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "explore", element: <GameExplorerPage /> },
      { path: "games/:slug", element: <GameDetailPage /> },
    ],
  },
]);

export default router;
