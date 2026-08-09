import { Component, DestroyRef, ElementRef, inject, signal, viewChild } from '@angular/core';
import { Router } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';

type ParticleType = 'heart' | 'sparkle' | 'envelope' | 'petal';
type ParticleLayer = 'local' | 'ambient';
type ParticleDepth = 'soft' | 'medium' | 'hero';

interface CelebrationParticle {
  id: number;
  type: ParticleType;
  symbol: string;
  layer: ParticleLayer;
  depth: ParticleDepth;
  x: number;
  y: number;
  size: number;
  delay: number;
  duration: number;
  moveX: number;
  moveY: number;
  rotation: number;
  scale: number;
  opacity: number;
  blur: number;
  curveX: number;
  curveY: number;
  midRotation: number;
}

const PARTICLE_LIFETIME_MS = 4200;
const REACTION_DURATION_MS = 800;

@Component({
  selector: 'app-celebration',
  standalone: true,
  imports: [TranslatePipe],
  templateUrl: './celebration.component.html',
  styleUrl: './celebration.component.scss',
})
/** Segunda página: celebra la respuesta y permite abrir la carta. */
export class CelebrationComponent {
  private readonly router = inject(Router);
  private readonly destroyRef = inject(DestroyRef);
  private readonly timers = new Set<ReturnType<typeof setTimeout>>();
  private nextParticleId = 0;

  readonly hasCelebrated = signal(false);
  readonly celebrationActive = signal(false);
  readonly particles = signal<CelebrationParticle[]>([]);
  readonly celebrateButton = viewChild<ElementRef<HTMLButtonElement>>('celebrateButton');

  constructor() {
    this.destroyRef.onDestroy(() => {
      this.timers.forEach((timer) => clearTimeout(timer));
    });
  }

  triggerCelebration(): void {
    if (this.celebrationActive()) return;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isFirstCelebration = !this.hasCelebrated();
    const amount = reducedMotion ? (isFirstCelebration ? 12 : 9) : isFirstCelebration ? 62 : 38;
    const buttonRect = this.celebrateButton()?.nativeElement.getBoundingClientRect();
    const batch = this.createParticles(amount, buttonRect, reducedMotion);
    const batchIds = new Set(batch.map((particle) => particle.id));

    this.hasCelebrated.set(true);
    this.celebrationActive.set(true);
    this.particles.update((particles) => [...particles, ...batch]);

    this.schedule(() => this.celebrationActive.set(false), REACTION_DURATION_MS);
    this.schedule(
      () => this.particles.update((particles) => particles.filter(({ id }) => !batchIds.has(id))),
      PARTICLE_LIFETIME_MS,
    );
  }

  openLetter(): void {
    void this.router.navigate(['/carta'], {
      queryParams: { open: true },
    });
  }

  private createParticles(
    amount: number,
    buttonRect: DOMRect | undefined,
    reducedMotion: boolean,
  ): CelebrationParticle[] {
    const options: Array<{ type: ParticleType; symbol: string }> = [
      { type: 'heart', symbol: '♥' },
      { type: 'heart', symbol: '♡' },
      { type: 'sparkle', symbol: '✦' },
      { type: 'sparkle', symbol: '✨' },
      { type: 'envelope', symbol: '💌' },
      { type: 'petal', symbol: '🌸' },
    ];

    return Array.from({ length: amount }, (_, index) => {
      const option = options[Math.floor(Math.random() * options.length)];
      const layer: ParticleLayer = index < Math.ceil(amount * 0.65) ? 'local' : 'ambient';
      const isLocal = layer === 'local';
      const depth: ParticleDepth = isLocal
        ? Math.random() > 0.55
          ? 'hero'
          : 'medium'
        : Math.random() > 0.7
          ? 'medium'
          : 'soft';
      const originX = buttonRect ? buttonRect.left + buttonRect.width / 2 : window.innerWidth / 2;
      const originY = buttonRect
        ? buttonRect.top + buttonRect.height / 2
        : window.innerHeight * 0.78;
      const spread = reducedMotion ? 20 : 1;

      const moveY = reducedMotion
        ? -(8 + Math.random() * 15)
        : isLocal
          ? -(130 + Math.random() * 230)
          : -(180 + Math.random() * 300);
      const rotation = -180 + Math.random() * 360;

      return {
        id: this.nextParticleId++,
        ...option,
        layer,
        depth,
        x: isLocal ? originX + (-12 + Math.random() * 24) : Math.random() * window.innerWidth,
        y: isLocal
          ? originY + (-8 + Math.random() * 16)
          : window.innerHeight * (0.65 + Math.random() * 0.35),
        size:
          depth === 'hero'
            ? 28 + Math.random() * 18
            : depth === 'medium'
              ? 16 + Math.random() * 12
              : 8 + Math.random() * 8,
        delay: isLocal ? Math.random() * 0.12 : 0.15 + Math.random() * 0.45,
        duration: isLocal ? 2.5 + Math.random() * 0.7 : 3 + Math.random() * 0.55,
        moveX: reducedMotion
          ? -spread + Math.random() * spread * 2
          : isLocal
            ? -190 + Math.random() * 380
            : -70 + Math.random() * 140,
        moveY,
        rotation,
        scale: 0.8 + Math.random() * 0.7,
        opacity: depth === 'soft' ? 0.5 + Math.random() * 0.25 : 0.72 + Math.random() * 0.25,
        blur: depth === 'soft' ? Math.random() * 0.55 : 0,
        curveX: reducedMotion ? 0 : -40 + Math.random() * 80,
        curveY: moveY * 0.46,
        midRotation: rotation * 0.45,
      };
    });
  }

  private schedule(action: () => void, delay: number): void {
    const timer = setTimeout(() => {
      this.timers.delete(timer);
      action();
    }, delay);
    this.timers.add(timer);
  }
}
