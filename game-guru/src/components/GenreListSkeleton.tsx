import { HStack, ListItem, Skeleton } from "@chakra-ui/react";


const GenreListSkeleton = () => {
  return (
    <ListItem paddingY='5px' justifyContent='space-between'>
      <HStack>
        <Skeleton boxSize='32px' borderRadius={8} />
        <Skeleton flex='1' height='32px' borderRadius={8} />
      </HStack>
    </ListItem>
  );
}

export default GenreListSkeleton;