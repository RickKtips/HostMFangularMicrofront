/**
 * Interface representing the user information returned by the authentication process.
 */
export interface User {
  id: string;
  email: string;
  name: string;
  picture?: string;
}

/**
 * Interface for the authentication response, containing the JWT token and user data.
 */
export interface AuthResponse {
  token: string;
  user: User;
}
