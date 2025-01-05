export interface Session {
  user: {
    id: string
    email: string
    name?: string
  }
  expires: string
}

export interface AuthUser {
  id: string
  email: string
  name?: string
  password: string
  createdAt: Date
  updatedAt: Date
} 