import useData from "./useData";
import { Genre } from "./useGenres";

// Platform object
export interface Platform {
  id: number;
  name: string;
  slug: string;
}

// Game object
export interface Game {
  id: number;
  name: string;
  background_image: string;
  parent_platforms: { platform: Platform }[];
  metacritic: number;
}

const useGames = (selectedGenre: Genre | null, selectedPlatform: Platform |null) => 
  useData<Game>('/games', {
    // Parameter objects being sent to server
    params: {
      genres: selectedGenre?.id,
      platforms: selectedPlatform?.id
    } },
    // Dependencies
    [selectedGenre?.id, selectedPlatform?.id]
  );

export default useGames;