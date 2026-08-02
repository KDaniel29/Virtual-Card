import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter, withHashLocation } from '@angular/router';
import { provideTranslateService } from '@ngx-translate/core';
import { provideTranslateHttpLoader } from '@ngx-translate/http-loader';
import { AppComponent } from './app/app.component';
import { routes } from './app/app.routes';

// HashLocation evita errores 404 al actualizar una ruta alojada en GitHub Pages.
bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(),
    provideRouter(routes, withHashLocation()),
    provideTranslateService({
      fallbackLang: 'es',
      lang: 'es',
      loader: provideTranslateHttpLoader({ prefix: 'assets/i18n/', suffix: '.json' }),
    }),
  ],
}).catch(console.error);
