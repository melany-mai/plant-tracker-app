import type { JwtPayload } from '@/types/auth'

export function decodeJwt(token: string): JwtPayload {
  const payload = token.split('.')[1]
  const base64 = payload!.replace(/-/g, '+').replace(/_/g, '/')
  return JSON.parse(atob(base64)) as JwtPayload
}

export function isExpired(payload: JwtPayload): boolean {
  return Date.now() >= payload.exp * 1000
}
