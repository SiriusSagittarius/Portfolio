import { Component, HostBinding, HostListener, inject } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [TranslateModule, CommonModule],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  translate = inject(TranslateService);
  isMenuOpen = false;

  @HostBinding('class.scrolled') isScrolled = false;
  activeSection = ''; // Speichert den aktuell ausgewählten Menüpunkt

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.isScrolled = window.scrollY > 5;
  }

  switchLanguage(lang: string) {
    this.translate.use(lang);
  }

  setActiveSection(section: string) {
    this.activeSection = section;
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  closeMenu() {
    this.isMenuOpen = false;
  }
}
