import { GameQuery } from "../App";
import useData from "./useData";

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

const useGames = (gameQuery: GameQuery) => 
  useData<Game>('/games', {
    // Parameter objects being sent to server
    params: {
      genres: gameQuery.genre?.id,
      platforms: gameQuery.platform?.id,
      ordering: gameQuery.sortOrder,
      search: gameQuery.searchText,
    } },
    // Dependencies
    [gameQuery]
  );

export default useGames;