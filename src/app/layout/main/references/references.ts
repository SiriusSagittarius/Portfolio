import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { ScrollAnimationDirective } from '../../../shared/directives/scroll-animation.directive';

@Component({
  selector: 'app-references',
  standalone: true,
  imports: [TranslateModule, ScrollAnimationDirective],
  templateUrl: './references.html',
  styleUrls: ['./references.scss'],
})
export class References {
  currentIndex = 0;
  readonly totalCards = 3;

  next() {
    this.currentIndex = (this.currentIndex + 1) % this.totalCards;
  }

  prev() {
    this.currentIndex = (this.currentIndex - 1 + this.totalCards) % this.totalCards;
  }

  setIndex(index: number) {
    this.currentIndex = index;
  }
}
