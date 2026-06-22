import { Component, inject, signal, resource } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { AuthRequest } from '../../core/model/auth.model';

/**
 * Login Component connecting to the Java Backend.
 * Uses Angular Resource API and Signals.
 */
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styles: [`
    .login-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      height: 100vh;
      font-family: Arial, sans-serif;
      background-color: #f5f5f5;
    }
    .login-card {
      background: white;
      padding: 2rem;
      border-radius: 8px;
      box-shadow: 0 4px 6px rgba(0,0,0,0.1);
      width: 100%;
      max-width: 400px;
    }
    .form-group {
      margin-bottom: 1rem;
      width: 100%;
    }
    label {
      display: block;
      margin-bottom: 0.5rem;
      color: #333;
    }
    input {
      width: 100%;
      padding: 0.75rem;
      border: 1px solid #ccc;
      border-radius: 4px;
      box-sizing: border-box;
    }
    .login-btn {
      width: 100%;
      cursor: pointer;
      padding: 0.75rem;
      background-color: #007bff;
      color: white;
      border: none;
      border-radius: 4px;
      font-size: 16px;
      transition: background-color 0.3s;
      margin-top: 1rem;
    }
    .login-btn:hover {
      background-color: #0056b3;
    }
    .login-btn:disabled {
      background-color: #ccc;
    }
    .error-msg {
      color: #dc3545;
      margin-top: 1rem;
      font-size: 0.9rem;
    }
    .example-data {
      margin-top: 1.5rem;
      padding-top: 1rem;
      border-top: 1px solid #eee;
      font-size: 0.8rem;
      color: #666;
    }
  `]
})
export class Login {
  private authService = inject(AuthService);

  // Signal for login form data
  credentials = signal<AuthRequest | null>(null);

  email = '';
  password = '';

  /**
   * Using the Resource API to handle the authentication request.
   */
  authResource = resource({
    params: () => this.credentials(),
    loader: (param) => {
      const credentials = param.params;
      if (!credentials) return Promise.resolve(null);
      return new Promise((resolve, reject) => {
        this.authService.login(credentials).subscribe({
          next: (res) => resolve(res),
          error: (err) => reject(err)
        });
      });
    }
  });

  /**
   * Handles form submission.
   */
  onSubmit() {
    if (this.email && this.password) {
      this.credentials.set({
        email: this.email,
        password: this.password
      });
    }
  }
}
