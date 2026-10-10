import { Component, DestroyRef, afterNextRender, inject, signal } from '@angular/core';
import { Contact } from './contact/contact';
import { Header } from '../header/header';
import { Hero } from './hero/hero';
import { MyWork } from './my-work/my-work';
import { References } from './references/references';
import { SkillSet } from './skill-set/skill-set';

const ACTIVATION_EVENTS = ['scroll', 'wheel', 'touchstart', 'pointerdown', 'keydown'] as const;

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [Header, Hero, SkillSet, MyWork, References, Contact],
  templateUrl: './main.html',
  styleUrls: ['./main.scss'],
})
export class Main {
  /** Wird bei der ersten Nutzer-Interaktion true und rendert dann alle @defer-Sektionen. */
  protected readonly activated = signal(false);

  constructor() {
    const activate = () => {
      this.activated.set(true);
      removeListeners();
    };
    const removeListeners = () =>
      ACTIVATION_EVENTS.forEach((type) => window.removeEventListener(type, activate));

    // afterNextRender läuft nur im Browser, nicht beim Prerendern
    afterNextRender(() =>
      ACTIVATION_EVENTS.forEach((type) =>
        window.addEventListener(type, activate, { passive: true, once: true }),
      ),
    );
    inject(DestroyRef).onDestroy(() => {
      if (typeof window !== 'undefined') {
        removeListeners();
      }
    });
  }
}
