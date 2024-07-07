import { HStack, List, ListItem, Image, Button, Heading } from "@chakra-ui/react";
import useGenres, { Genre } from "../hooks/useGenres";
import getCroppedImageUrl from "../services/image-url";
import GenreListSkeleton from "./GenreListSkeleton";

// Notify parent component of selected genre (App.tsx)
interface Props {
  onSelectGenre: (genre: Genre) => void;
  selectedGenre: Genre | null;
}

const GenreList = ({ selectedGenre, onSelectGenre }: Props) => {
  const { data, isLoading, error } = useGenres();
  const skeletons = Array.from({ length: 19 }, (_, i) => i + 1);

  if (error) return null;

  return (
    <>
    <Heading fontSize='2xl' marginBottom={3}>Genres</Heading>
      <List>
        {/* Skeletons */}
        {isLoading &&
          skeletons.map((skeleton) => (
              <GenreListSkeleton key={skeleton} />
          ))}
        {/* Genres */}
        {data?.results.map((genre) => (
          <ListItem key={genre.id} paddingY='5px'>
            <HStack>
              <Image
                boxSize="32px"
                borderRadius={8}
                objectFit={'cover'}
                src={getCroppedImageUrl(genre.image_background)}
              />
              <Button whiteSpace={'normal'} textAlign='left' fontWeight={genre.id === selectedGenre?.id ? 'bold' : 'normal'} onClick={() => onSelectGenre(genre)} fontSize='lg' variant='link'>{genre.name}</Button>
            </HStack>
          </ListItem>
        ))}
      </List>
    </>
  );
};

export default GenreList;
