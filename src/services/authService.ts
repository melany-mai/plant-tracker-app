import { apiRequest } from './httpClient'
import type { AuthTokens, Credentials, RegisterPayload } from '@/types/auth'

export function login(credentials: Credentials) {
  return apiRequest<AuthTokens>('/auth', {
    method: 'POST',
    body: credentials,
    format: 'json',
  })
}

export function register(payload: RegisterPayload) {
  return apiRequest<{ id: number; email: string }>('/api/register', {
    method: 'POST',
    body: payload,
  })
}

export function refreshToken(refresh_token: string) {
  return apiRequest<AuthTokens>('/api/token/refresh', {
    method: 'POST',
    body: { refresh_token },
    format: 'json',
  })
}

export function logout(token: string, refresh_token: string) {
  return apiRequest<{ code: number; message: string }>('/api/logout', {
    method: 'POST',
    body: { refresh_token },
    format: 'json',
    token,
  })
}