import axios from 'axios'

const BASE_URL = 'http://localhost:3003'

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 100000,
  headers: {
    'Content-Type': 'application/json',
  },
})

export default api
