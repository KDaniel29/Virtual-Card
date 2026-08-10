import { DestroyRef, Injectable, computed, inject, signal } from '@angular/core';
import { MUSIC_PLAYLIST } from '../config/music.config';
import { RepeatMode } from '../models/song.model';

@Injectable({ providedIn: 'root' })
export class MusicService {
  private readonly destroyRef = inject(DestroyRef);
  private readonly audio = new Audio();
  private volumeBeforeMute = 0.35;

  readonly songs = MUSIC_PLAYLIST;
  readonly started = signal(false);
  readonly currentSongIndex = signal(0);
  readonly currentSong = computed(() => this.songs[this.currentSongIndex()]);
  readonly playing = signal(false);
  readonly available = signal(this.songs.length > 0);
  readonly currentTime = signal(0);
  readonly duration = signal(0);
  readonly volume = signal(0.35);
  readonly muted = signal(false);
  readonly shuffle = signal(false);
  readonly repeatMode = signal<RepeatMode>('off');

  private readonly onLoadedMetadata = () => this.duration.set(this.audio.duration || 0);
  private readonly onTimeUpdate = () => this.currentTime.set(this.audio.currentTime || 0);
  private readonly onPlay = () => this.playing.set(true);
  private readonly onPause = () => this.playing.set(false);
  private readonly onEnded = () => this.handleEnded();
  private readonly onError = () => {
    this.available.set(false);
    this.playing.set(false);
    console.warn(`No se pudo cargar la canción: ${this.currentSong()?.src ?? 'sin ruta'}`);
  };

  constructor() {
    this.audio.preload = 'metadata';
    this.audio.volume = this.volume();
    this.bindAudioEvents();
    this.loadCurrentSong();
    this.destroyRef.onDestroy(() => this.unbindAudioEvents());
  }

  async start(): Promise<void> {
    this.started.set(true);
    await this.play();
  }

  async play(): Promise<void> {
    if (!this.currentSong()) return;
    try {
      await this.audio.play();
      this.available.set(true);
    } catch {
      this.playing.set(false);
    }
  }

  pause(): void {
    this.audio.pause();
  }

  async togglePlay(): Promise<void> {
    this.started.set(true);
    if (this.playing()) this.pause();
    else await this.play();
  }

  async next(fromEnded = false): Promise<void> {
    if (this.songs.length === 0) return;

    if (this.shuffle() && this.songs.length > 1) {
      let nextIndex = this.currentSongIndex();
      while (nextIndex === this.currentSongIndex()) {
        nextIndex = Math.floor(Math.random() * this.songs.length);
      }
      await this.selectSong(nextIndex);
      return;
    }

    const isLast = this.currentSongIndex() === this.songs.length - 1;
    if (fromEnded && isLast && this.repeatMode() === 'off') {
      this.pause();
      this.audio.currentTime = 0;
      this.currentTime.set(0);
      return;
    }

    await this.selectSong(isLast ? 0 : this.currentSongIndex() + 1);
  }

  async previous(): Promise<void> {
    if (this.audio.currentTime > 3) {
      this.seek(0);
      return;
    }
    const index =
      this.currentSongIndex() === 0 ? this.songs.length - 1 : this.currentSongIndex() - 1;
    await this.selectSong(index);
  }

  async selectSong(index: number): Promise<void> {
    if (index < 0 || index >= this.songs.length) return;
    this.currentSongIndex.set(index);
    this.loadCurrentSong();
    await this.play();
  }

  seek(seconds: number): void {
    if (!Number.isFinite(seconds)) return;
    this.audio.currentTime = Math.min(Math.max(seconds, 0), this.duration() || 0);
    this.currentTime.set(this.audio.currentTime);
  }

  setVolume(value: number): void {
    const volume = Math.min(Math.max(value, 0), 1);
    this.audio.volume = volume;
    this.audio.muted = false;
    this.volume.set(volume);
    this.muted.set(false);
    if (volume > 0) this.volumeBeforeMute = volume;
  }

  toggleMute(): void {
    if (this.muted()) {
      this.audio.muted = false;
      this.setVolume(this.volumeBeforeMute || 0.35);
    } else {
      if (this.volume() > 0) this.volumeBeforeMute = this.volume();
      this.audio.muted = true;
      this.muted.set(true);
    }
  }

  toggleShuffle(): void {
    this.shuffle.update((enabled) => !enabled);
  }

  toggleRepeat(): void {
    const modes: RepeatMode[] = ['off', 'all', 'one'];
    const nextMode = modes[(modes.indexOf(this.repeatMode()) + 1) % modes.length];
    this.repeatMode.set(nextMode);
  }

  private loadCurrentSong(): void {
    const song = this.currentSong();
    if (!song) return;
    this.available.set(true);
    this.currentTime.set(0);
    this.duration.set(0);
    this.audio.src = song.src;
    this.audio.load();
  }

  private handleEnded(): void {
    if (this.repeatMode() === 'one') {
      this.seek(0);
      void this.play();
      return;
    }
    void this.next(true);
  }

  private bindAudioEvents(): void {
    this.audio.addEventListener('loadedmetadata', this.onLoadedMetadata);
    this.audio.addEventListener('timeupdate', this.onTimeUpdate);
    this.audio.addEventListener('play', this.onPlay);
    this.audio.addEventListener('pause', this.onPause);
    this.audio.addEventListener('ended', this.onEnded);
    this.audio.addEventListener('error', this.onError);
  }

  private unbindAudioEvents(): void {
    this.audio.removeEventListener('loadedmetadata', this.onLoadedMetadata);
    this.audio.removeEventListener('timeupdate', this.onTimeUpdate);
    this.audio.removeEventListener('play', this.onPlay);
    this.audio.removeEventListener('pause', this.onPause);
    this.audio.removeEventListener('ended', this.onEnded);
    this.audio.removeEventListener('error', this.onError);
  }
}
