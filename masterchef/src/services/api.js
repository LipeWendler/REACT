import axios from "axios";

const api = axios.create({
    baseURL: '/public/db/receitas.json'
});

export default api;