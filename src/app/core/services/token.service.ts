import { Injectable, signal, effect } from '@angular/core';

/**
 * Service responsible for managing the JWT token.
 * Uses Angular Signals to provide a reactive way to access the current token.
 */
@Injectable({
  providedIn: 'root'
})
export class TokenService {
  private readonly TOKEN_KEY = 'auth_token';

  // Signal to store the current token, initialized from localStorage
  private _token = signal<string | null>(localStorage.getItem(this.TOKEN_KEY));

  constructor() {
    // Effect to keep localStorage in sync with the signal
    effect(() => {
      const currentToken = this._token();
      if (currentToken) {
        localStorage.setItem(this.TOKEN_KEY, currentToken);
      } else {
        localStorage.removeItem(this.TOKEN_KEY);
      }
    });
  }

  /**
   * Returns the current token as a read-only signal.
   */
  get token() {
    return this._token.asReadonly();
  }

  /**
   * Sets a new token.
   * @param token The JWT token string.
   */
  setToken(token: string): void {
    this._token.set(token);
  }

  /**
   * Removes the token.
   */
  removeToken(): void {
    this._token.set(null);
  }

  /**
   * Checks if a token exists.
   */
  isAuthenticated(): boolean {
    return !!this._token();
  }
}
