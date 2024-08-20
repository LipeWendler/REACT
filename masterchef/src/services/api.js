import axios from "axios";

const api = axios.create({
    baseURL: '/public/receitas.json'
});

export default api;