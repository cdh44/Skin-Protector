import axios from 'axios';

const API_BASE_URL = "http://localhost:8814"; // Spring Boot 서버 주소

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        "Content-Type": "application/json"
    }
});

export default api;
