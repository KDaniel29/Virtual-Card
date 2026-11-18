import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FloatingHeartsComponent } from './shared/components/floating-hearts/floating-hearts.component';
import { MusicPlayerComponent } from './shared/components/music-player/music-player.component';
import { LanguageService } from './services/language.service';
import { PwaInstallComponent } from './shared/components/pwa-install/pwa-install.component';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FloatingHeartsComponent, MusicPlayerComponent, PwaInstallComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
/** Componente raíz: compone las etapas y las secciones de toda la experiencia. */
export class AppComponent {
  readonly language = inject(LanguageService);
}
