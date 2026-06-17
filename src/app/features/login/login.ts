import { Component, inject, signal, resource } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../core/services/auth.service';

/**
 * Login Component implementing Google OAuth2.0.
 * Uses Angular Resource API and Signals.
 */
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './login.html',
  styles: [`
    .login-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      height: 100vh;
      font-family: Arial, sans-serif;
    }
    .google-btn {
      cursor: pointer;
      padding: 10px 20px;
      background-color: #4285f4;
      color: white;
      border: none;
      border-radius: 4px;
      font-size: 16px;
      transition: background-color 0.3s;
    }
    .google-btn:hover {
      background-color: #357ae8;
    }
    .loading {
      margin-top: 20px;
    }
  `]
})
export class Login {
  private authService = inject(AuthService);

  // Signal to store the Google token after a simulated login click
  googleToken = signal<string | null>(null);

  /**
   * Using the Resource API to handle the authentication request.
   */
  authResource = resource({
    params: () => this.googleToken(),
    loader: (param) => {
      const token = param.params;
      if (!token) return Promise.resolve(null);
      return new Promise((resolve, reject) => {
        this.authService.loginWithGoogle(token).subscribe({
          next: (res) => resolve(res),
          error: (err) => reject(err)
        });
      });
    }
  });

  /**
   * Simulates the Google Login button click.
   */
  onGoogleLogin() {
    console.log('Simulating Google Login...');
    const simulatedToken = 'google-oauth-token-' + Math.random().toString(36).substring(7);
    this.googleToken.set(simulatedToken);
  }
}
