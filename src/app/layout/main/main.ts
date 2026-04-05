import { Component } from '@angular/core';
import { ContactFormComponent } from './contact-form/contact-form';
import { IntroComponent } from './intro/intro';
import { MyWorkComponent} from './my-work/my-work';
import { SkillSetComponent } from './skill-set/skill-set';
import { References } from "./references/references";

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [
    IntroComponent,
    SkillSetComponent,
    MyWorkComponent,
    ContactFormComponent,
    References
],
  templateUrl: './main.html',
  styleUrl: './main.scss'
})
export class Main {

}
