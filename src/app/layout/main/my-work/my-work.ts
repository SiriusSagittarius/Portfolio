import { Component } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { NgOptimizedImage } from '@angular/common';
import { ScrollAnimationDirective } from '../../../shared/directives/scroll-animation.directive';

@Component({
  selector: 'app-my-work',
  standalone: true,
  imports: [TranslateModule, NgOptimizedImage, ScrollAnimationDirective],
  templateUrl: './my-work.html',
  styleUrls: ['./my-work.scss'],
})
export class MyWork {
  projects = [
    {
      mockup: 'videoflix.webp',
      width: 930,
      height: 590,
      name: 'Videoflix',
      projectLanguage: 'Python | Django | PostgreSQL | Redis | Docker',
      description: 'videoflix',
      link: 'Videoflix',
      liveTest: 'https://videoflix.svenhaase.de/',
      translatedDescription: '',
    },
    {
      mockup: 'quizly.webp',
      width: 930,
      height: 590,
      name: 'Quizly',
      projectLanguage: 'Python | Django | Whisper AI | Gemini',
      description: 'quizly',
      link: 'Quizly',
      liveTest: 'https://quizly.svenhaase.de/',
      translatedDescription: '',
    },
    {
      mockup: 'coderr.webp',
      width: 930,
      height: 590,
      name: 'Coderr',
      projectLanguage: 'Python | Django | Django REST Framework',
      description: 'coderr',
      link: 'coderr',
      liveTest: 'https://coderr.svenhaase.de/',
      translatedDescription: '',
    },
    {
      mockup: 'kanban.webp',
      width: 930,
      height: 590,
      name: 'KanMind',
      projectLanguage: 'Python | Django | Django REST Framework',
      description: 'kanmind',
      link: 'KanMind',
      liveTest: 'https://kanmind.svenhaase.de/',
      translatedDescription: '',
    },
    {
      mockup: 'join.webp',
      width: 930,
      height: 590,
      name: 'Join',
      projectLanguage: 'JavaScript | HTML | CSS',
      description: 'join',
      link: 'join',
      team: true,
      liveTest: 'https://join.svenhaase.de/',
      translatedDescription: '',
    },
    {
      mockup: 'pollo_loco.webp',
      width: 930,
      height: 590,
      name: 'El Pollo Loco',
      projectLanguage: 'JavaScript | HTML | CSS',
      description: 'epl',
      link: 'EL_POLLO_LOCO',
      liveTest: 'https://epl.svenhaase.de/',
      translatedDescription: '',
    },
    {
      mockup: 'dabubble.webp',
      width: 930,
      height: 590,
      name: 'DaBubble',
      projectLanguage: 'Angular | Firebase | TypeScript',
      description: 'dabubble',
      link: 'dabubble-2',
      team: true,
      liveTest: 'https://dabubble.svenhaase.de/',
      translatedDescription: '',
    },
    {
      mockup: 'pollapp.webp',
      width: 930,
      height: 590,
      name: 'PollApp',
      projectLanguage: 'Angular | Firebase | TypeScript',
      description: 'pollapp',
      link: 'pollapp',
      liveTest: 'https://pollapp.svenhaase.de/',
      translatedDescription: '',
    },
    {
      mockup: 'shooter.webp',
      width: 930,
      height: 590,
      name: 'Shooter',
      projectLanguage: 'Angular | Three.js | TypeScript',
      description: 'shooter',
      link: '3d-shooter',
      liveTest: 'https://shooter.svenhaase.de/',
      translatedDescription: '',
    },
    {
      mockup: 'sauerei.webp',
      width: 930,
      height: 590,
      name: 'Sauerei',
      projectLanguage: 'Angular | TypeScript',
      description: 'sauerei',
      link: 'Sau',
      liveTest: 'https://sauerei.web.app',
      translatedDescription: '',
    },
    {
      mockup: 'easytv.webp',
      width: 930,
      height: 590,
      name: 'EasyTV',
      projectLanguage: 'Java | JavaScript | C++ | Python',
      description: 'easytv',
      link: 'easy-tv_Windows',
      liveTest: 'https://easy-tv.org/',
      translatedDescription: '',
    },
  ];

  private languageChangeSubscription: Subscription | undefined;
  constructor(private translateService: TranslateService) {}

  ngOnInit(): void {
    this.translateProjectDescriptions();
    this.languageChangeSubscription = this.translateService.onLangChange.subscribe(() => {
      this.translateProjectDescriptions();
    });
  }

  ngOnDestroy(): void {
    if (this.languageChangeSubscription) {
      this.languageChangeSubscription.unsubscribe();
    }
  }
  translateProjectDescriptions(): void {
    this.projects.forEach((project) => {
      const translationKey = `myWork.${project.description}`;
      this.translateService.get(translationKey).subscribe((translatedDescription: string) => {
        project.translatedDescription = translatedDescription;
      });
    });
  }

  isEven(index: number): boolean {
    return index % 2 === 0;
  }
}
