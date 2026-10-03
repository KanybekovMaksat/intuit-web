// shared/lib/api/apiClient.ts
import axios, { AxiosInstance, InternalAxiosRequestConfig } from 'axios';
import { getCookie, removeCookie, setCookie } from 'typescript-cookie';

const envUrl = (import.meta.env.VITE_API_URL as string | undefined) || 'https://intuit.makalabox.com';
export const API_URL = envUrl.replace(/\/api\/?$/, '').replace(/\/+$/, '');
export const API_BASE_URL = `${API_URL}/api/`;

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
  baseURL: API_BASE_URL,
  timeout: 15000,
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
