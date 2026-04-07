import { Component, OnInit, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { Footer } from './layout/footer/footer';
import { Header } from './layout/header/header';
import AOS from 'aos';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, Header, Footer, TranslateModule],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App implements OnInit {
  private translate = inject(TranslateService);
  private platformId = inject(PLATFORM_ID);
  title = 'Sven Haase';

  constructor() {
    this.translate.addLangs(['en', 'de']);
    this.translate.use('en');
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
