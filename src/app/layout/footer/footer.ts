import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './footer.html',
  styleUrl: './footer.scss',
})
export class Footer {
  constructor(private router: Router) {}

  navigateToImprint() {
    this.router.navigateByUrl('/imprint').then(() => {
      window.scrollTo(0, 0);
    });
  }
}
