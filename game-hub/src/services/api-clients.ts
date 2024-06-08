import axios from "axios";

export default axios.create({
  baseURL:'https://api.rawg.io/api',
  params: {
    key: '34901339bba14e259cdbc2cea2508330'
  }
})