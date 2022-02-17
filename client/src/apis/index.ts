import axios from 'axios';

const BASE_URL = 'http://localhost:3003'

export const api = axios.create({
    baseURL: BASE_URL,
    timeout: 100000,
    headers: {
        'Content-Type': 'application/json',
    },
});

api.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        return console.error(error.response);
    },
);
