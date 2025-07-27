import { Component, ViewChild, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-for-finders',
  templateUrl: './for-finders.component.html',
  styleUrls: ['./for-finders.component.scss']
})
export class ForFindersComponent implements AfterViewInit, OnDestroy {
  @ViewChild('videoPlayer') videoPlayer!: ElementRef<HTMLVideoElement>;

  isPlaying = false;
  progress = 0;
  private progressInterval: any;

  ngAfterViewInit() {
    const video = this.videoPlayer.nativeElement;
    
    video.addEventListener('play', () => {
      this.isPlaying = true;
      this.startProgressTracking();
    });

    video.addEventListener('pause', () => {
      this.isPlaying = false;
      this.stopProgressTracking();
    });

    video.addEventListener('ended', () => {
      this.isPlaying = false;
      this.progress = 0;
      this.stopProgressTracking();
    });

    video.addEventListener('timeupdate', () => {
      if (video.duration) {
        this.progress = (video.currentTime / video.duration) * 100;
      }
    });
  }

  ngOnDestroy() {
    this.stopProgressTracking();
  }

  togglePlay() {
    const video = this.videoPlayer.nativeElement;
    if (video.paused) {
      video.play();
    } else {
      video.pause();
    }
  }

  seekVideo(event: MouseEvent) {
    const video = this.videoPlayer.nativeElement;
    const progressBar = event.currentTarget as HTMLElement;
    const rect = progressBar.getBoundingClientRect();
    const clickX = event.clientX - rect.left;
    const percentage = (clickX / rect.width) * 100;
    
    if (video.duration) {
      video.currentTime = (percentage / 100) * video.duration;
    }
  }

  private startProgressTracking() {
    this.progressInterval = setInterval(() => {
      const video = this.videoPlayer.nativeElement;
      if (video.duration && !video.paused) {
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
