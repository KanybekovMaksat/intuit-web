// shared/lib/api/apiClient.ts
import axios, { AxiosInstance, InternalAxiosRequestConfig } from 'axios';
import { getCookie, removeCookie, setCookie } from 'typescript-cookie';

export const API_URL = import.meta.env.VITE_API_URL;

const AUTH_TOKEN_COOKIE = 'auth_token';

function getCurrentLanguage() {
  return getCookie('language') || 'ru'; // Язык по умолчанию — 'ru'
}

export function getAuthToken() {
  return getCookie(AUTH_TOKEN_COOKIE);
}

export function setAuthToken(token: string) {
  // path указываем явно: собственные атрибуты заменяют умолчания typescript-cookie
  setCookie(AUTH_TOKEN_COOKIE, token, {
    path: '/',
    expires: 30,
    sameSite: 'lax',
    secure: window.location.protocol === 'https:',
  });
}

export function clearAuthToken() {
  removeCookie(AUTH_TOKEN_COOKIE, { path: '/' });
}

// Создаем экземпляр Axios с настройками по умолчанию
const apiClient: AxiosInstance = axios.create({
  baseURL: API_URL,
});

// Добавляем перехватчик, который добавляет язык и токен пользователя ко всем запросам
apiClient.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  config.headers.set('Accept-Language', getCurrentLanguage());
  const token = getAuthToken();
  if (token) {
    config.headers.set('Authorization', `Token ${token}`);
  }
  return config;
});

// Недействительный токен (например, после выхода на другом устройстве) — сбрасываем
apiClient.interceptors.response.use(undefined, (error) => {
  if (error?.response?.status === 401 && getAuthToken()) {
    clearAuthToken();
  }
  return Promise.reject(error);
});

export default apiClient;
