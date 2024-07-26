import { Button, HStack, Image } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.webp";
import ColorModeSwitch from "./ColorModeSwitch";
import SearchInput from "./SearchInput";

const NavBar = () => {
  return (
    <HStack padding="10px">
      {/* Logo is a button that takes the user to the homescreen */}
      <Link to="/">
        <Button
          variant="unstyled"
          w="60px"
          h="60px"
          minW="60px" // Ensures the button doesn't shrink below the image size
          minH="60px"
          _hover={{
            transform: "scale(1.05)",
          }}
          transition="transform .15s ease-in"
        >
          <Image src={logo} borderRadius={"10px"} boxShadow="md" />
        </Button>
      </Link>
      <SearchInput />
      <ColorModeSwitch />
    </HStack>
  );
};

export default NavBar;
