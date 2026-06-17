import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { TokenService } from './token.service';
import { User, AuthResponse } from '../model/auth.model';
import { tap, catchError, of } from 'rxjs';

/**
 * Service to handle Google OAuth2.0 authentication and user session.
 */
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http = inject(HttpClient);
  private tokenService = inject(TokenService);
  private router = inject(Router);

  // User signal to store the current authenticated user
  private _currentUser = signal<User | null>(null);
  public currentUser = this._currentUser.asReadonly();

  constructor() {
    // In a real application, we might want to fetch user info if a token exists
    if (this.tokenService.isAuthenticated()) {
      this.loadUserFromToken();
    }
  }

  /**
   * Handles the Google OAuth2.0 callback or login process.
   */
  loginWithGoogle(googleToken: string) {
    // In a real scenario, this would be an HTTP POST to your backend
    return this.http.post<AuthResponse>('/api/auth/google', { token: googleToken }).pipe(
      tap(response => {
        this.tokenService.setToken(response.token);
        this._currentUser.set(response.user);
        this.router.navigate(['/']);
      }),
      catchError(error => {
        console.error('Login failed', error);
        return of(null);
      })
    );
  }

  /**
   * Logs out the user by clearing the token and user state.
   */
  logout(): void {
    this.tokenService.removeToken();
    this._currentUser.set(null);
    this.router.navigate(['/login']);
  }

  /**
   * Simulates loading user data from the token.
   */
  private loadUserFromToken(): void {
    this._currentUser.set({
      id: '1',
      email: 'user@example.com',
      name: 'Logged User'
    });
  }
}
