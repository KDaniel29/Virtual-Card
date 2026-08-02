import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FloatingHeartsComponent } from './shared/components/floating-hearts/floating-hearts.component';
import { MusicPlayerComponent } from './shared/components/music-player/music-player.component';
import { LanguageSwitcherComponent } from './shared/components/language-switcher/language-switcher.component';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FloatingHeartsComponent, MusicPlayerComponent, LanguageSwitcherComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
/** Componente raíz: compone las etapas y las secciones de toda la experiencia. */
export class AppComponent {}
