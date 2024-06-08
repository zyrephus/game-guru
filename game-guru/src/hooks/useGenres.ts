import { useEffect, useState } from "react";
import apiClients from "../services/api-clients";
import { CanceledError } from "axios";

// Genre object
interface Genre {
  id: number;
  name: string;
}

interface FetchGenresResponse {
  count: number;
  results: Genre[];
}

// Fetching genre data from API
const useGenres = () => {
  const [genres, setGenres] = useState<Genre[]>([]);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Fetching game data from API
  useEffect (() => {
    const controller = new AbortController();

    setIsLoading(true);
    apiClients.get<FetchGenresResponse>('/genres', { signal: controller.signal })
      .then(res => {
        setGenres(res.data.results);
        setIsLoading(false);
      })
      .catch(err => {
        if (err instanceof CanceledError) return;
        setError(err.message);
        setIsLoading(false);
      });

    return () => controller.abort();
}, []);

return {genres, error, isLoading };
}

export default useGenres;