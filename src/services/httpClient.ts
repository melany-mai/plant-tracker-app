const API_URL = import.meta.env.VITE_API_URL

type RequestFormat = 'json' | 'ld+json'

interface RequestOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE'
  body?: unknown
  format?: RequestFormat
  token?: string
}

export class ApiError extends Error {
  constructor(
    message: string,
    public status: number,
  ) {
    super(message)
    this.name = 'ApiError'
  }
}

async function extractErrorMessage(response: Response): Promise<string> {
  const data = await response.json().catch(() => null)
  return data?.detail ?? data?.message ?? `Erreur HTTP ${response.status}`
}

export async function apiRequest<T>(path: string, options: RequestOptions = {}): Promise<T> {
  const { method = 'GET', body, format = 'ld+json', token } = options
  const contentType = format === 'ld+json' ? 'application/ld+json' : 'application/json'

  const headers: Record<string, string> = {
    'Content-Type': contentType,
    Accept: contentType,
  }
  if (token) {
    headers.Authorization = `Bearer ${token}`
  }

  const response = await fetch(`${API_URL}${path}`, {
    method,
    headers,
    body: body !== undefined ? JSON.stringify(body) : undefined,
  })

  if (!response.ok) {
    throw new ApiError(await extractErrorMessage(response), response.status)
  }

  if (response.status === 204) {
    return undefined as T
  }

  return (await response.json()) as T
}