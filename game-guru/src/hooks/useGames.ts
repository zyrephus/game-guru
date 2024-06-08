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

const useGames = () => useData<Game>('/games');

export default useGames;