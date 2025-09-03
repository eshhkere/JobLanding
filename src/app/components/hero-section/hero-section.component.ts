import { Component, Input } from '@angular/core';

type Role = 'finder' | 'employer';

@Component({
  selector: 'app-hero-section',
  templateUrl: './hero-section.component.html',
  styleUrls: ['./hero-section.component.scss']
})
export class HeroSectionComponent {
  @Input() role: Role = 'finder';
  @Input() switchRole!: () => void;

  hoveredStar: number | null = null;
  selectedStar: number = 0;

  animationDirection: 'left' | 'right' = 'left';
  animationState: string = 'slide-left-visible';

  onStarEnter(index: number): void { this.hoveredStar = index; }
  onStarLeave(): void { this.hoveredStar = null; }
  onStarClick(index: number): void { this.selectedStar = index; }

  animateRoleSwitch(direction: 'left' | 'right') {
    this.animationDirection = direction;
    this.animationState = direction === 'left' ? 'slide-left-hidden' : 'slide-right-hidden';
    setTimeout(() => {
      this.switchRole();
      this.animationState = direction === 'left' ? 'slide-left-visible' : 'slide-right-visible';
    }, 500); // 500ms = длительность анимации
  }

  openTelegram() {
    window.open('https://t.me/PodrabotaiBot', '_blank');
  }
}