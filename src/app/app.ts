import { Component, OnInit, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { Footer } from './layout/footer/footer';
import { NavigationComponent } from './shared/components/navigation/navigation';
import { HeaderComponent } from './layout/header/header';
import AOS from 'aos';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, Footer, NavigationComponent, HeaderComponent, TranslateModule],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App implements OnInit {
  private translate = inject(TranslateService);
  private platformId = inject(PLATFORM_ID);
  title = 'Sven Haase';

  constructor() {
    // Setzt die Standardsprache, falls keine andere gefunden wird
    this.translate.setDefaultLang('de');
    // Nutzt die aktuell gewählte Sprache (z.B. aus dem Browser oder Speicher)
    this.translate.use('de');
  }

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      AOS.init();
    }
  }

  switchLanguage(lang: string) {
    this.translate.use(lang);
  }
}
