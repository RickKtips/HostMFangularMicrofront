import { Routes } from '@angular/router';
import { loadRemoteModule } from '@angular-architects/module-federation';
const MICROFRONTEND_URL = 'http://localhost:4202';
export const routes: Routes = [
  { path: '', loadComponent: () => import('./features/home/home').then(m => m.Home) },
  // {
  // path: 'micro1',
  //   loadComponent: () =>
  //     loadRemoteModule({
  //       remoteEntry: 'http://localhost:4202/remoteEntry.js',
  //       exposedModule: './Component',
  //       type: 'module',
  //     }).then((m) => m.App),
  // },
  {
    path: 'pokemons',
    loadChildren: () =>
      loadRemoteModule({
        type: 'module',
        remoteEntry: `${MICROFRONTEND_URL}/remoteEntry.js`,
        exposedModule: './Routes',
      }).then((m) => m.routes),
  },
];
