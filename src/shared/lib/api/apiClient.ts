// shared/lib/api/apiClient.ts
import axios, { AxiosInstance, InternalAxiosRequestConfig } from 'axios';
import { getCookie } from 'typescript-cookie';

export const API_URL = import.meta.env.VITE_API_URL;

function getCurrentLanguage() {
  return getCookie('language') || 'ru'; // Язык по умолчанию — 'ru'
}

// Создаем экземпляр Axios с настройками по умолчанию
const apiClient: AxiosInstance = axios.create({
  baseURL: API_URL,
});

// Добавляем перехватчик, который добавляет язык ко всем запросам
apiClient.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  config.headers.set('Accept-Language', getCurrentLanguage());
  return config;
});

export default apiClient;