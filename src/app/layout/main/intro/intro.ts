import { Component } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-intro',
  standalone: true,
  imports: [TranslateModule],
  templateUrl: './intro.html',
  styleUrl: './intro.scss',
})
export class IntroComponent {
  constructor(public translateService: TranslateService) {}

  changeLanguage(langCode: string) {
    this.translateService.use(langCode);
  }
}
