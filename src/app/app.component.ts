import { Component } from '@angular/core';

@Component({
  selector: 'my-prefix-root',
  template: `
    <div style="text-align:center" class="content">
      <h1>Bienvenue dans </h1>

    <router-outlet></router-outlet>
  `,
  styles: []
})
export class AppComponent {
  title = 'easdir';
}
