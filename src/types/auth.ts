export interface Credentials {
  email: string
  password: string
}

export interface RegisterPayload {
  email: string
  username: string
  plainPassword: string
}

export interface AuthTokens {
  token: string
  refresh_token: string
}

export interface JwtPayload {
  iat: number
  exp: number
  roles: string[]
  email: string
}
