import { Box, Spinner, keyframes, useColorModeValue } from '@chakra-ui/react';

const fadeOut = keyframes`
  from { opacity: 1; }
  to { opacity: 0; }
`;

const LoadingScreen = () => {
  const bg = useColorModeValue('white', 'gray.800');

  return (
    <Box
      position="fixed"
      top="0"
      left="0"
      right="0"
      bottom="0"
      display="flex"
      justifyContent="center"
      alignItems="center"
      bg={bg}
      zIndex="9999"
      animation={`${fadeOut} 0.5s ease-out 1.5s forwards`}
    >
      <Spinner
        thickness="4px"
        speed="0.65s"
        emptyColor="gray.200"
        color="purple.500"
        size="xl"
      />
    </Box>
  );
};

export default LoadingScreen;