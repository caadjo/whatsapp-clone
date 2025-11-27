import axios from 'axios';

// URL do backend Spring Boot
const API_BASE_URL = 'http://localhost:8088/api/v1';

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
    timeout: 10000,
});

// Interceptor para adicionar o token do Keycloak
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Interceptor de resposta
api.interceptors.response.use(
    (response) => response,
    (error) => {
        console.error('❌ Erro na API:', error.response?.status);
        return Promise.reject(error);
    }
);

export default api;