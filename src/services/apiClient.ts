import { apiRequest, ApiError, type RequestOptions } from './httpClient'
import { useAuthStore } from '@/stores/auth'

export async function authorizedRequest<T>(
  path: string,
  options: Omit<RequestOptions, 'token'> = {},
): Promise<T> {
  const authStore = useAuthStore()

  try {
    return await apiRequest<T>(path, { ...options, token: authStore.token ?? undefined })
  } catch (error) {
    if (!(error instanceof ApiError) || error.status !== 401) {
      throw error
    }
  }

  try {
    await authStore.refresh()
  } catch {
    await authStore.logout()
    throw new ApiError('Session expirée, merci de te reconnecter.', 401)
  }

  return apiRequest<T>(path, { ...options, token: authStore.token ?? undefined })
}
