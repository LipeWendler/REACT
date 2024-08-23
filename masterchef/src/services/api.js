import axios from "axios";

const api = axios.create({
    baseURL: 'http://localhost:3004/0'
});

export default api;