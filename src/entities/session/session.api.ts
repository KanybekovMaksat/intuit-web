import apiClient from '~shared/lib/api/apiClient'
import { AuthResponse, LoginPayload, RegisterPayload, User } from './session.types'

export function login(payload: LoginPayload) {
  return apiClient.post<AuthResponse>('auth/login/', payload)
}

export function register(payload: RegisterPayload) {
  return apiClient.post<AuthResponse>('auth/register/', payload)
}

export function logout() {
  return apiClient.post('auth/logout/')
}

export function getMe() {
  return apiClient.get<User>('auth/me/')
}
