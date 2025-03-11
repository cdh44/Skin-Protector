import axios from 'axios';

const API_BASE_URL = "http://localhost:8814"; // Spring Boot 서버 주소

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        "Content-Type": "application/json"
    }
});

// 요청 시 자동으로 토큰 추가하는 인터셉터 설정
api.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
}, (error) => {
    return Promise.reject(error);
});

export default api;
