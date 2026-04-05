import { CommonModule } from '@angular/common';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-my-work',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './my-work.html',
  styleUrl: './my-work.scss',
})
export class MyWorkComponent implements OnInit, OnDestroy {
  projects = [
    {
      mockup: 'pokedex.png',
      name: 'Pokedex',
      projectLanguage: 'JavaScript | HTML | CSS',
      description: 'pokedex',
      link: 'Pokedex',
      liveTest: 'https://svenhaase.developerakademie.net/pokedex/index.html',
      safeLiveTest: null as any,
      translatedDescription: '',
    },
    {
      mockup: 'pollo_loco.png',
      name: 'Pollo Loco',
      projectLanguage: 'JavaScript | HTML | CSS',
      description: 'epl',
      link: 'El_Pollo_Loco',
      liveTest: 'https://svenhaase.developerakademie.net/el_pollo_loco/index.html',
      safeLiveTest: null as any,
      translatedDescription: '',
    },
  ];

  private languageChangeSubscription: Subscription | undefined;

  constructor(
    private translateService: TranslateService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    // URLs für Angular sicher machen
    this.projects.forEach((project) => {
      project.safeLiveTest = this.sanitizer.bypassSecurityTrustUrl(project.liveTest.trim());
    });

    this.translateProjectDescriptions();
    
    // Auf Sprachwechsel reagieren
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
}