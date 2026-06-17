import { ApplicationConfig, provideZonelessChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';

import { routes } from './app.routes';
import { jwtInterceptor } from './core/interceptors/jwt.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    // Enable zoneless change detection
    provideZonelessChangeDetection(),
    // Configure Router
    provideRouter(routes),
    // Configure HttpClient with JWT Interceptor
    provideHttpClient(
      withInterceptors([jwtInterceptor])
    )
  ]
};
