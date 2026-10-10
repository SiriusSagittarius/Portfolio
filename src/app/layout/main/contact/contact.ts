import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { ScrollAnimate } from '../../../shared/directives/scroll-animate';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [FormsModule, CommonModule, TranslateModule, RouterLink, ScrollAnimate],
  templateUrl: './contact.html',
  styleUrl: './contact.scss',
})
export class Contact {
  constructor(
    public translateService: TranslateService,
    private router: Router,
  ) {}

  http = inject(HttpClient);
  privacyPolicyErrorVisible: boolean = false;
  isChecked: boolean = false;
  readOrNot: boolean = false;
  successVisible: boolean = false;

  contactData = {
    name: '',
    email: '',
    message: '',
  };

  mailTest = false;

  post = {
    endPoint: 'https://svenhaase.de/sendMail.php',
    body: (payload: any) => JSON.stringify(payload),
    options: {
      headers: {
        'Content-Type': 'text/plain',
        responseType: 'text',
      },
    },
  };

  navigateToPrivacy() {
    this.router.navigateByUrl('/privacy').then(() => {
      window.scrollTo(0, 0);
    });
  }

  onSubmit(ngForm: NgForm) {
    if (ngForm.valid && ngForm.submitted) {
      if (!this.readOrNot) {
        console.error('Please accept the privacy policy');

        return;
      }

      this.http.post(this.post.endPoint, this.post.body(this.contactData)).subscribe({
        next: (response) => {
          // console.log('Form submitted successfully');
          ngForm.resetForm();
          this.triggerSuccessAnimation();
        },
        error: (error) => {
          console.error('Error submitting form:', error);
        },
        complete: () => {
          // console.info('Post request complete');
        },
      });
    }
  }

  toggleCheckbox() {
    this.isChecked = true;
    this.readOrNot = true;
    this.submitFormCheck();
  }

  submitFormCheck() {
    if (!this.readOrNot) {
      this.privacyPolicyErrorVisible = true;
    } else {
      this.privacyPolicyErrorVisible = false;
    }
  }

  private triggerSuccessAnimation() {
    this.successVisible = true;
    setTimeout(() => {
      this.successVisible = false;
    }, 1500);
  }

  isFormValid(contactForm: NgForm): boolean {
    return contactForm.form.valid && this.readOrNot;
  }

  markFieldsIfInvalid(ngForm: NgForm) {
    if (!this.isFormValid(ngForm)) {
      Object.values(ngForm.controls).forEach((control) => {
        control.markAsDirty();
      });
    }
  }
}
