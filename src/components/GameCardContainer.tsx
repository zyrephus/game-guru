import { ReactNode } from "react";
import { Box } from "@chakra-ui/react";

interface Props {
  children: ReactNode;
}

const GameCardContainer = ({ children }: Props) => {
  return (
    <Box
      _hover={{
        transform: "scale(1.05)",
      }}
      transition="transform .15s ease-in"
      width="100%"
      borderRadius={10}
      overflow="hidden"
    >
      {children}
    </Box>
  );
};

export default GameCardContainer;
