import { Routes } from '@angular/router';

/**
 * Rutas del recorrido. Se cargan bajo demanda para reducir el paquete inicial.
 * El comodín devuelve cualquier URL desconocida a la pregunta inicial.
 */
export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/home-question/home-question.component').then(
        (component) => component.HomeQuestionComponent,
      ),
  },
  {
    path: 'celebracion',
    loadComponent: () =>
      import('./pages/celebration/celebration.component').then(
        (component) => component.CelebrationComponent,
      ),
  },
  {
    path: 'carta',
    loadComponent: () =>
      import('./pages/letter/letter-page.component').then(
        (component) => component.LetterPageComponent,
      ),
  },
  { path: '**', redirectTo: '' },
];
