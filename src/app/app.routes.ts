import { Routes } from '@angular/router';
import { loadRemoteModule } from '@angular-architects/module-federation';
import { authGuard } from './core/guards/auth.guard';

const MICROFRONTEND_URL = 'http://localhost:4202';

/**
 * Main application routes.
 * The login route is the only one accessible without authentication.
 * All other routes are protected by authGuard.
 */
export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () => import('./features/login/login').then(m => m.Login)
  },
  {
    path: '',
    loadComponent: () => import('./features/home/home').then(m => m.Home),
    canActivate: [authGuard]
  },
  {
    path: 'pokemons',
    loadChildren: () =>
      loadRemoteModule({
        type: 'module',
        remoteEntry: `${MICROFRONTEND_URL}/remoteEntry.js`,
        exposedModule: './Routes',
      }).then((m) => m.routes),
    canActivate: [authGuard]
  },
  // Redirect any unknown routes to home (which will redirect to login if not authenticated)
  { path: '**', redirectTo: '' }
];
