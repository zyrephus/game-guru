import { Button, Collapse, Text } from "@chakra-ui/react";
import { useState } from "react";

interface Props {
  children: string;
}

const ExpandableText = ({ children }: Props) => {
  const [expanded, setExpanded] = useState(false);
  const limit = 300;

  if (!children) return null; // Defensive programming

  if (children.length <= limit) {
    return <Text>{children}</Text>;
  }

  // const summary = expanded ? children : children.substring(0, limit) + "...";

  return (
    <>
      <Collapse startingHeight={45} in={expanded}>
        {children}
      </Collapse>
      <Button
        mt={2}
        size="sm"
        fontWeight="bold"
        colorScheme="yellow"
        onClick={() => setExpanded(!expanded)}
      >
        Show {expanded ? "Less" : "More"}
      </Button>
    </>
  );
};

export default ExpandableText;
