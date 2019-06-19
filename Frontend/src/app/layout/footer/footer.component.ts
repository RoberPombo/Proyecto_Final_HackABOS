import { Component } from '@angular/core';


@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {

  constructor() { }


  goToGithub() {
    window.open('https://github.com/RoberPombo/Proyecto_Final_HackABOS', '_blank');
  }
}
