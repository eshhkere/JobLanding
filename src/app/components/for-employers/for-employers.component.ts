import { Component, ViewChild, ElementRef, AfterViewInit, OnDestroy, ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-for-employers',
  templateUrl: './for-employers.component.html',
  styleUrls: ['./for-employers.component.scss']
})
export class ForEmployersComponent implements AfterViewInit, OnDestroy {
  @ViewChild('videoPlayer') videoPlayer!: ElementRef<HTMLVideoElement>;
  isPlaying = false;
  progress = 0;
  isVideoLoaded = false;
  videoError = false;
  private progressInterval: any;

  constructor(private cdr: ChangeDetectorRef) {}

  ngAfterViewInit() {
    const video = this.videoPlayer.nativeElement;
    
    // Добавляем обработчики загрузки и ошибок
    video.addEventListener('loadeddata', () => {
      this.isVideoLoaded = true;
      this.videoError = false;
      this.cdr.detectChanges();
    });

    video.addEventListener('error', (e) => {
      this.videoError = true;
      this.isVideoLoaded = false;
      this.cdr.detectChanges();
      console.error('Ошибка загрузки видео:', e);
    });

    video.addEventListener('play', () => {
      this.isPlaying = true;
      this.startProgressTracking();
      this.cdr.detectChanges();
    });

    video.addEventListener('pause', () => {
      this.isPlaying = false;
      this.stopProgressTracking();
      this.cdr.detectChanges();
    });

    video.addEventListener('ended', () => {
      this.isPlaying = false;
      this.progress = 0;
      this.stopProgressTracking();
      this.cdr.detectChanges();
    });

    video.addEventListener('timeupdate', () => {
      if (video.duration) {
        this.progress = (video.currentTime / video.duration) * 100;
        this.cdr.detectChanges();
      }
    });

    // Предзагрузка видео
    // video.load();
  }

  ngOnDestroy() {
    this.stopProgressTracking();
  }

  togglePlay() {
    const video = this.videoPlayer.nativeElement;
    
    // Загружаем видео только при первом клике
    if (!this.isVideoLoaded && !this.videoError) {
      video.load();
      
      // Ждем загрузки и сразу запускаем воспроизведение
      video.addEventListener('canplay', () => {
        video.play().catch(error => {
          console.error('Ошибка воспроизведения:', error);
          this.videoError = true;
          this.cdr.detectChanges();
        });
      }, { once: true });
      
      return;
    }
    
    if (!this.isVideoLoaded) {
      return;
    }

    // Добавляем проверку на поддержку воспроизведения
    const playPromise = video.paused ? video.play() : Promise.resolve(video.pause());
    
    if (playPromise !== undefined) {
      playPromise.catch(error => {
        console.error('Ошибка воспроизведения:', error);
        this.videoError = true;
        this.cdr.detectChanges();
      });
    }
  }

  seekVideo(event: MouseEvent) {
    const video = this.videoPlayer.nativeElement;
    
    if (!this.isVideoLoaded || !video.duration) {
      return;
    }

    const progressBar = event.currentTarget as HTMLElement;
    const rect = progressBar.getBoundingClientRect();
    const clickX = event.clientX - rect.left;
    const percentage = (clickX / rect.width) * 100;
    
    video.currentTime = (percentage / 100) * video.duration;
  }

  retryVideo() {
    const video = this.videoPlayer.nativeElement;
    this.videoError = false;
    this.isVideoLoaded = false;
    video.load();
    this.cdr.detectChanges();
  }

  private startProgressTracking() {
    this.progressInterval = setInterval(() => {
      const video = this.videoPlayer.nativeElement;
      if (video.duration && !video.paused && !video.ended) {
        this.progress = (video.currentTime / video.duration) * 100;
      }
    }, 100);
  }

  private stopProgressTracking() {
    if (this.progressInterval) {
      clearInterval(this.progressInterval);
      this.progressInterval = null;
    }
  }
}