import { NgOptimizedImage } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { ScrollAnimationDirective } from '../../../shared/directives/scroll-animation.directive';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [FormsModule, TranslateModule, RouterLink, NgOptimizedImage, ScrollAnimationDirective],
  templateUrl: './contact.html',
  styleUrls: ['./contact.scss'],
})
export class Contact {
  translateService = inject(TranslateService);
  private router = inject(Router);

  readOrNot: boolean = false;
  isSuccessMessageVisible = signal(false);

  contactData = {
    name: '',
    email: '',
    message: '',
  };

  // Natives fetch statt HttpClient: spart das HttpClient-Paket im Start-Bundle
  post = {
    endPoint: 'https://svenhaase.de/sendMail.php',
    body: (payload: { name: string; email: string; message: string }) => JSON.stringify(payload),
    headers: {
      'Content-Type': 'text/plain',
    },
  };

  navigateToPrivacy() {
    this.router.navigateByUrl('/privacy').then(() => {
      window.scrollTo(0, 0);
    });
  }

  async onSubmit(ngForm: NgForm) {
    if (ngForm.valid && ngForm.submitted) {
      if (!this.readOrNot) {
        console.error('Please accept the privacy policy');

        return;
      }

      try {
        const response = await fetch(this.post.endPoint, {
          method: 'POST',
          headers: this.post.headers,
          body: this.post.body(this.contactData),
        });
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`);
        }
        ngForm.resetForm();
        this.showSuccessMessage();
      } catch (error) {
        console.error('Error submitting form:', error);
      }
    }
  }

  private showSuccessMessage() {
    this.isSuccessMessageVisible.set(true);

    setTimeout(() => {
      this.isSuccessMessageVisible.set(false);
    }, 1500);
  }

  scrollToTop(): void {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }

  isFormValid(contactForm: NgForm): boolean {
    return contactForm.form.valid && this.readOrNot;
  }
}
