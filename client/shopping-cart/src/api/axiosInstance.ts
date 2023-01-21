import axios from "axios";

export const BASE_URL = "localhost:3003";

const instance = axios.create({
  baseURL: BASE_URL,
  timeout: 2000,
  headers: {
    "Content-Type": "application/json",
  },
});

export default instance;
