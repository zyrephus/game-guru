import { Box } from "@chakra-ui/react";
import useTrailers from "../hooks/useTrailers";

interface Props {
  gameId: number;
}

const GameTrailer = ({ gameId }: Props) => {
  const { data, error, isLoading } = useTrailers(gameId);
  console.log(data)

  if (isLoading) return null;

  if (error) throw error;

  const first = data?.results[0];
  return first ? (
    <Box mb={2}>
      <video src={first.data[480]} poster={first.preview} controls className="w-full h-auto" />
    </Box>
  ) : null;
};

export default GameTrailer;
