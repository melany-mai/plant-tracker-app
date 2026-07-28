import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import * as authService from '@/services/authService'
import { decodeJwt } from '@/utils/jwt'
import type { Credentials, RegisterPayload } from '@/types/auth'

export const useAuthStore = defineStore('auth', () => {
  const token = ref<string | null>(localStorage.getItem('token'))
  const refreshTokenValue = ref<string | null>(localStorage.getItem('refresh_token'))

  const isAuthenticated = computed(() => token.value !== null)
  const roles = computed(() => (token.value ? decodeJwt(token.value).roles : []))
  const email = computed(() => (token.value ? decodeJwt(token.value).email : null))
  const isAdmin = computed(() => roles.value.includes('ROLE_ADMIN'))

  function setTokens(tokens: { token: string; refresh_token: string }) {
    token.value = tokens.token
    refreshTokenValue.value = tokens.refresh_token
    localStorage.setItem('token', tokens.token)
    localStorage.setItem('refresh_token', tokens.refresh_token)
  }

  function clearTokens() {
    token.value = null
    refreshTokenValue.value = null
    localStorage.removeItem('token')
    localStorage.removeItem('refresh_token')
  }

  async function login(credentials: Credentials) {
    setTokens(await authService.login(credentials))
  }

  async function register(payload: RegisterPayload) {
    await authService.register(payload)
    await login({ email: payload.email, password: payload.plainPassword })
  }

  async function refresh() {
    if (!refreshTokenValue.value) {
      throw new Error('Aucun refresh token disponible')
    }
    setTokens(await authService.refreshToken(refreshTokenValue.value))
  }

  async function logout() {
    if (token.value && refreshTokenValue.value) {
      await authService.logout(token.value, refreshTokenValue.value).catch(() => {})
    }
    clearTokens()
  }

  return {
    token,
    isAuthenticated,
    roles,
    email,
    isAdmin,
    login,
    register,
    refresh,
    logout,
  }
})
