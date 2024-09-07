import { Button, Collapse, Text } from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";

interface Props {
  children: string;
}

const ExpandableText = ({ children }: Props) => {
  const [expanded, setExpanded] = useState(false);
  const [isOverflowing, setIsOverflowing] = useState(false);
  const textRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // Checks if content overflows the starting height (48 pixels)
    if (textRef.current && textRef.current.scrollHeight > 48) {
      setIsOverflowing(true);
    }
  }, [children]);

  if (!children) return null; // Defensive programming

  return (
    <>
      <Collapse startingHeight={48} in={expanded}>
        <div ref={textRef}>{children}</div>
      </Collapse>
      {isOverflowing && (
        <Button
          mt={2}
          size="sm"
          fontWeight="bold"
          colorScheme="yellow"
          onClick={() => setExpanded(!expanded)}
        >
          Show {expanded ? "Less" : "More"}
        </Button>
      )}
    </>
  );
};

export default ExpandableText;
