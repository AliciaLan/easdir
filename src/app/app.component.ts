import { Component } from '@angular/core';

@Component({
  selector: 'my-prefix-root',
  template: `
    <h1>Bienvenue dans EasDir</h1>
    <img src="../assets/logo.jpg">
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
