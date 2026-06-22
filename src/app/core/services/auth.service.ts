import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { TokenService } from './token.service';
import { User, AuthResponse, AuthRequest } from '../model/auth.model';
import { tap, catchError, of } from 'rxjs';

/**
 * Service to handle authentication and user session.
 * Connects to the Java Spring Boot backend.
 */
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http = inject(HttpClient);
  private tokenService = inject(TokenService);
  private router = inject(Router);

  // API base URL - adjusted for potential Docker environment or proxy
  private apiUrl = 'http://localhost:8080/api/v1/auth';

  // User signal to store the current authenticated user
  private _currentUser = signal<User | null>(null);
  public currentUser = this._currentUser.asReadonly();

  constructor() {
    if (this.tokenService.isAuthenticated()) {
      // In a real application, we might want to fetch user info from backend
      // for now we trust the stored state or implement a /me endpoint
      this.loadUserFromStorage();
    }
  }

  /**
   * Standard login with email and password.
   */
  login(credentials: AuthRequest) {
    return this.http.post<AuthResponse>(`${this.apiUrl}/authenticate`, credentials).pipe(
      tap(response => {
        this.tokenService.setToken(response.token);
        this._currentUser.set(response.user);
        localStorage.setItem('user', JSON.stringify(response.user));
        this.router.navigate(['/']);
      }),
      catchError(error => {
        console.error('Login failed', error);
        throw error;
      })
    );
  }

  /**
   * Logs out the user by clearing the token and user state.
   */
  logout(): void {
    this.tokenService.removeToken();
    this._currentUser.set(null);
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }

  /**
   * Loads user data from local storage.
   */
  private loadUserFromStorage(): void {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      this._currentUser.set(JSON.parse(savedUser));
    }
  }
}
