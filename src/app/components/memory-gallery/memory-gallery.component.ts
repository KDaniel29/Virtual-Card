import { Component } from '@angular/core';
import { LOVE_CONFIG } from '../../config/love.config';

@Component({
  selector: 'app-memory-gallery',
  standalone: true,
  templateUrl: './memory-gallery.component.html',
  styleUrl: './memory-gallery.component.scss',
})
/** Genera la galería desde `LOVE_CONFIG.memories`. */
export class MemoryGalleryComponent {
  readonly config = LOVE_CONFIG;
  readonly icons = ['📷', '🌷', '✨', '🗺️'];
}
