import { Directive, ElementRef, OnDestroy, OnInit, inject } from '@angular/core';

/**
 * Ersetzt das JavaScript der AOS-Bibliothek: setzt "aos-animate", sobald ein
 * [data-aos]-Element 120px weit in den Viewport ragt. Die Animation selbst kommt
 * weiterhin aus aos.css. Der IntersectionObserver liefert die Position selbst,
 * deshalb gibt es keine erzwungenen Reflows durch offsetTop / pageYOffset.
 */
@Directive({
  selector: '[data-aos]',
  standalone: true,
})
export class ScrollAnimate implements OnInit, OnDestroy {
  private element: HTMLElement = inject(ElementRef).nativeElement;
  private observer?: IntersectionObserver;

  ngOnInit(): void {
    if (typeof IntersectionObserver === 'undefined') {
      this.element.classList.add('aos-animate');
      return;
    }

    this.observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          this.element.classList.add('aos-animate');
        } else if (entry.boundingClientRect.top > 0) {
          // Wie bei AOS: nur zurücksetzen, wenn das Element wieder unterhalb des Viewports liegt
          this.element.classList.remove('aos-animate');
        }
      },
      { rootMargin: '0px 0px -120px 0px' },
    );
    this.observer.observe(this.element);
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }
}
