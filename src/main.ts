import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter, withHashLocation } from '@angular/router';
import { AppComponent } from './app/app.component';
import { routes } from './app/app.routes';

// HashLocation evita errores 404 al actualizar una ruta alojada en GitHub Pages.
bootstrapApplication(AppComponent, {
  providers: [provideRouter(routes, withHashLocation())],
}).catch(console.error);
