import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:3004/receitas'
});

export default api;