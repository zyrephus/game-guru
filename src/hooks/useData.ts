import { useEffect, useState } from "react";
import apiClients from "../services/api-client";
import { AxiosRequestConfig, CanceledError } from "axios";

export interface FetchResponse<T> {
  count: number;
  results: T[];
}

// Fetching data from API
const useData = <T>(endpoint: string, requestConfig?: AxiosRequestConfig, deps?: any[]) => {
  const [data, setData] = useState<T[]>([]);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Fetching data from API
  useEffect (() => {
    const controller = new AbortController();

    setIsLoading(true);
    apiClients.get<FetchResponse<T>>(endpoint, { signal: controller.signal, ...requestConfig })
      .then(res => {
        setData(res.data.results);
        setIsLoading(false);
      })
      .catch(err => {
        if (err instanceof CanceledError) return;
        setError(err.message);
        setIsLoading(false);
      });

    return () => controller.abort();
}, deps? [...deps] : []);

return {data, error, isLoading };
}

export default useData;