import axios from "axios";

const API_URL = "http://localhost:8070/api/v1";

export const api = axios.create({
    baseURL: API_URL,
    timeout: 50000,
})
