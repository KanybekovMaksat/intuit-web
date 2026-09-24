export type User = {
  id: number
  email: string
  firstName: string
  lastName: string
  fullName: string
}

export type AuthResponse = {
  token: string
  user: User
}

export type LoginPayload = {
  email: string
  password: string
}

export type RegisterPayload = LoginPayload & {
  firstName: string
  lastName: string
}
