import axios from 'axios'

const request = axios.create({
  baseURL: 'http://localhost:3003',
  timeout: 30000,
})

export default request
