import { Component } from '@angular/core';

@Component({
  selector: 'easdir-root',
  template: `
    <h1>Bienvenue dans EasDir</h1>
    <img src="../assets/logo.png">
    <router-outlet></router-outlet>
  `,
  styles: [`
    img {
      width:150px;
      height:150px;
    }
  `]
})
export class AppComponent {
  title = 'EasDir';
}
