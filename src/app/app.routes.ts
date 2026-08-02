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
    title: 'Una pregunta para ti',
  },
  {
    path: 'celebracion',
    loadComponent: () =>
      import('./pages/celebration/celebration.component').then(
        (component) => component.CelebrationComponent,
      ),
    title: '¡Dijiste que sí!',
  },
  {
    path: 'carta',
    loadComponent: () =>
      import('./pages/letter/letter-page.component').then(
        (component) => component.LetterPageComponent,
      ),
    title: 'Nuestra historia',
  },
  { path: '**', redirectTo: '' },
];
