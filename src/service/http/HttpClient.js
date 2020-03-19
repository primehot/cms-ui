import axios from 'axios';

export const API_BASE_URL = 'http://localhost:8080';

const http = axios.create({
    baseURL: API_BASE_URL,
    timeout: 1000
});


export default http;