import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'easdir-root',
  template: `
    <header class="{{ classColor }}">
      <img id="logo" src="../assets/logo.png">
      <div id="titre">
        <h1>{{ 'title' | translate }} <span id="easdir">EasDir</span></h1>
        <h3>{{ 'description' | translate }}</h3>
      </div>
      <div>
        <div id="colorMode">
          <img
            src="https://cdn-icons-png.flaticon.com/512/39/39857.png"
            *ngIf="this.classColor == 'clair'"
            (click)="ToggleColorMode()">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTD8I86HR8yoWpLCFAqa40BC0yn6AsU9e_pXg&usqp=CAU"
            *ngIf="this.classColor == 'sombre'"
            (click)="ToggleColorMode()">
        </div>
        <div id="langMode">
          <img
            src="{{ 'img_lang' | translate }}"
            (click)="switchLanguage()">
        </div>
      </div>
    </header>

    <router-outlet></router-outlet>

    <footer class="{{ classColor }}">
      <p class="text-footer">{{ 'footer_description' | translate }}</p>
      <p class="text-footer">{{ 'footer_credit' | translate }}</p>
    </footer>
  `,
  styles: [``]
})
export class AppComponent {
  classColor: string = "clair";
  title = 'EasDir';

  constructor(public translate : TranslateService) {
    translate.addLangs(['fr', 'en']);
    translate.setDefaultLang('fr');
    translate.use(translate.getBrowserLang())
  }

  switchLanguage(){
    this.translate.use(
      this.translate.getLangs()[
        (this.translate.getLangs().indexOf(
          this.translate.currentLang)+1
        )%this.translate.getLangs().length
      ]);
  }

  ToggleColorMode() {
    if(this.classColor == "clair") {
      this.classColor = "sombre";
    } else {
      this.classColor = "clair";
    }
  }
}
