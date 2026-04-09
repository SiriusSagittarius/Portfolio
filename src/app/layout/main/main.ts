import { Component } from '@angular/core';
import { Contact } from './contact/contact';
import { Aboutme } from './aboutme/aboutme';
import { MyWorkComponent} from './my-work/my-work';
import { SkillSetComponent } from './skill-set/skill-set';
import { References } from "./references/references";
import { Hero } from "./hero/hero";


@Component({
  selector: 'app-main',
  standalone: true,
  imports: [
    Aboutme,
    SkillSetComponent,
    MyWorkComponent,
    Contact,
    References,
    Hero 
],
  templateUrl: './main.html',
  styleUrl: './main.scss'
})
export class Main {

}
