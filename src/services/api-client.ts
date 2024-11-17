import axios, { AxiosRequestConfig } from "axios";

// Defining a generic interface `FetchResponse<T>` to handle the structure of responses
// from the API. The API returns an object with three main properties
export interface FetchResponse<T> {
  count: number; // Total number of items returned by the API
  next: string | null; // URL for the next page of data, if available
  results: T[]; // The array of items returned, typed as generic T
}

const axiosInstance = axios.create({
  baseURL:'https://api.rawg.io/api',
  params: {
    key: import.meta.env.VITE_RAWG_API_KEY
  }
});

// Defining a generic class `APIClient<T>` where `T` is a placeholder for the type of data
// that the API will return (e.g., games, users, etc.).
class APIClient<T> {
  endpoint: string; // The specific API endpoint to query, e.g., '/games'

  constructor(endpoint: string) {
    this.endpoint = endpoint;
  }

  // Method to fetch all items from the API, using optional Axios configuration.
  // This method calls the base URL + endpoint with any additional config options.
  // It returns the data after Axios resolves the promise.
  getAll = (config: AxiosRequestConfig) => {
    return axiosInstance
      .get<FetchResponse<T>>(this.endpoint, config)
      .then(res => res.data);
  }

  // Method to fetch a single item by its `id` (which can be a number or string).
  // The ID is appended to the endpoint in the URL, and the result is returned.
  get = (id: number | string) => {
    return axiosInstance.get<T>(this.endpoint + '/' + id).then(res => res.data);
  }
}

export default APIClient;