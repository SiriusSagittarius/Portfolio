import { Component } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-imprint',
  standalone: true,
  imports: [TranslateModule],
  templateUrl: './imprint.html',
  styleUrl: './imprint.scss',
})
export class ImprintComponent {
  constructor(public translateService: TranslateService) {}
}
