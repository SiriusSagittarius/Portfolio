import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core'; 
@Component({
  selector: 'app-skill-set',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './skill-set.html',
  styleUrl: './skill-set.scss',
})
export class SkillSetComponent {
  imagePath: "img/icons/skill-set/desktop/" | string = "img/icons/skill-set/desktop/";

  skillIcons = [
    { icon: 'angular.svg', name: 'Angular' },
    { icon: 'typescript.svg', name: 'TypeScript' },
    { icon: 'javascript.svg', name: 'JavaScript' },
    { icon: 'html.svg', name: 'HTML' },
    { icon: 'scrum.svg', name: 'Scrum' },
    { icon: 'firebase.svg', name: 'Firebase' },
    { icon: 'git.svg', name: 'GIT' },
    { icon: 'css.svg', name: 'CSS' },
    { icon: 'api.svg', name: 'Rest-Api' },
    { icon: 'material_design.svg', name: 'Material Design' }
  ];

  getSkillIconPath(icon: string): string {
    return this.imagePath + icon;
  }
}
