import axios from "axios";

export interface FetchResponse<T> {
  count: number;
  results: T[];
}

export default axios.create({
  baseURL:'https://api.rawg.io/api',
  params: {
    key: '5bc56ff88e8348188b97b4a8b3fc172e'
  }
})