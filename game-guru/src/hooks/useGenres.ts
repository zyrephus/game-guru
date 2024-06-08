import useData from "./useData";

// Genre object
export interface Genre {
  id: number;
  name: string;
}

const useGenres = () => useData<Genre>('/genres')

export default useGenres;