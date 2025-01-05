/**
 * Session information returned by the auth system
 */
export interface Session {
  user: {
    id: string;
    email: string;
    name?: string;
  };
  expires: string;
}

/**
 * User data stored in the auth system
 */
export interface AuthUser {
  id: string;
  email: string;
  name?: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}
