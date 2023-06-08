import axios from 'axios';

const api = axios.create({
    baseURL: "https://localhost:7296",
});

export default api;