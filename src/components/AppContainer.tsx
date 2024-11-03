import { useState, useEffect } from 'react';
import { Box } from '@chakra-ui/react';
import LoadingScreen from './LoadingScreen';
import { Outlet } from 'react-router-dom';

const AppContainer = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <Box>
      {isLoading && <LoadingScreen />}
      <Box
        opacity={isLoading ? 0 : 1}
        transition="opacity 0.5s ease-in"
      >
        <Outlet />
      </Box>
    </Box>
  );
};

export default AppContainer;