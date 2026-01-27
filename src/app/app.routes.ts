import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'categorias',
    pathMatch: 'full',
  },
  {
    path: 'categorias',
    loadComponent: () =>
      import('./categorias/categorias.page').then((m) => m.CategoriasPage),
  },
  {
    path: 'tareas',
    loadComponent: () =>
      import('./tareas/tareas.page').then((m) => m.TareasPage),
  },
];
