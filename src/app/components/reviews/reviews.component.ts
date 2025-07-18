import { Component } from '@angular/core';

interface Review {
  id: number;
  text: string;
  rating: number;
  author: {
    name: string;
    location: string;
    image: string;
  };
}

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.scss']
})
export class ReviewsComponent {
  currentReviewIndex = 0;
  reviewAnimationState: '' | 'slide-out-left' | 'slide-in-left' | 'slide-out-right' | 'slide-in-right' = '';

  reviews: Review[] = [
    {
      id: 1,
      text: '«Искали официантов на выходные — разместили вакансию утром, а к вечеру уже было 15 откликов! Взяли двух сотрудников, которые отлично справились. Сервис реально экономит время, теперь пользуемся регулярно при необходимости подмены персонала. Рекомендую!»',
      rating: 5,
      author: {
        name: 'Ресторан "La Tartine"',
        location: 'Москва',
        image: 'assets/images/review-author-1.webp'
      }
    },
    {
      id: 2,
      text: '«Переехала в новый город и нужно было срочно найти работу. Через фильтрах выбрала "срочная вакансия" – уже через полчаса на смену в кафе. Зарплату выдали в тот же день. Отдельное спасибо за удобный и понятный интерфейс легко найти работу быстро и по душе!»',
      rating: 5,
      author: {
        name: 'Анна, официант',
        location: 'Краснодар',
        image: 'assets/images/review-author-2.webp'
      }
    },
    {
      id: 3,
      text: '«Открыли новую точку и срочно требовались лекари. Разместили вакансию вечером, а утром уже провели собеседования с тремя кандидатами. Взяли двух – они работают хорошо! Фильтр по опыту очень выручил: сразу отсеяли новичков, которых нужен не-стажер. Спасибо за экономию нервов и времени!»',
      rating: 5,
      author: {
        name: '"Ржаной Угол"',
        location: 'Казань',
        image: 'assets/images/review-author-3.webp'
      }
    }
  ];

  get currentReview(): Review {
    return this.reviews[this.currentReviewIndex];
  }

  get visibleReviews() {
    let count = 1;
    const width = window.innerWidth;
    if (width >= 960) count = 7;
    else if (width >= 768) count = 5;
    else if (width >= 480) count = 3;
  
    const half = Math.floor(count / 2);
    const result = [];
    for (let i = -half; i <= half; i++) {
      const idx = (this.currentReviewIndex + i + this.reviews.length) % this.reviews.length;
      result.push({
        ...this.reviews[idx],
        type: i === 0 ? 'center' : 'side'
      });
    }
    return result;
  }

  nextReview(): void {
    if (window.innerWidth < 480) {
      this.reviewAnimationState = 'slide-out-left';
      setTimeout(() => {
        this.currentReviewIndex = (this.currentReviewIndex + 1) % this.reviews.length;
        this.reviewAnimationState = 'slide-in-left';
        setTimeout(() => {
          this.reviewAnimationState = '';
        }, 350);
      }, 350);
    } else {
      this.currentReviewIndex = (this.currentReviewIndex + 1) % this.reviews.length;
    }
  }

  prevReview(): void {
    if (window.innerWidth < 480) {
      this.reviewAnimationState = 'slide-out-right';
      setTimeout(() => {
        this.currentReviewIndex = this.currentReviewIndex === 0 
          ? this.reviews.length - 1 
          : this.currentReviewIndex - 1;
        this.reviewAnimationState = 'slide-in-right';
        setTimeout(() => {
          this.reviewAnimationState = '';
        }, 350);
      }, 350);
    } else {
      this.currentReviewIndex = this.currentReviewIndex === 0 
        ? this.reviews.length - 1 
        : this.currentReviewIndex - 1;
    }
  }

  getStarArray(rating: number): number[] {
    return Array(rating).fill(0);
  }
}