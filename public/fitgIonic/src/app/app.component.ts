import { Component, ViewChild } from '@angular/core';
import { Config, Nav, Platform } from 'ionic-angular';

import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { TranslateService } from '@ngx-translate/core';

import { FirstRunPage, MainPage, SettingsPage, BodyAnalysisPage } from '../pages/pages';
import {UserService} from "../providers/providers";

@Component({
  template: `<ion-menu [content]="nav">
    <ion-header>
      <ion-toolbar>
        <ion-title>FitG | Menu</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <ion-list>
        <button menuClose ion-item *ngFor="let p of pages" (click)="openPage(p)">
          {{p.title}}
        </button>
        <button menuClose ion-item (click)="logout()">
          Log out
        </button>
      </ion-list>
    </ion-content>

  </ion-menu>
  <ion-nav #nav [root]="rootPage"></ion-nav>`
})
export class MyApp {
  rootPage = FirstRunPage;

  @ViewChild(Nav) nav: Nav;

  pages: any[] = [
    { title: 'Exercises', component: MainPage },
    { title: 'Body Analysis', component: BodyAnalysisPage },
    { title: 'Settings', component: SettingsPage }
  ];

  constructor(
    private translate: TranslateService,
    private platform: Platform,
    private config: Config,
    private statusBar: StatusBar,
    private splashScreen: SplashScreen,
    private userService: UserService
  ) {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
    this.initTranslate();

    this.userService.checkLogged().then(
      (logged) => {
        if (logged) {
          this.nav.setRoot(MainPage);
        }
      }
    );
  }

  initTranslate() {
    // Set the default language for translation strings, and the current language.
    this.translate.setDefaultLang('en');
    const browserLang = this.translate.getBrowserLang();

    if (browserLang === 'es') {
      //this.translate.use(this.translate.getBrowserLang());
      this.translate.use('en'); // Set your language here
    } else {
      this.translate.use('en'); // Set your language here
    }

    this.translate.get(['BACK_BUTTON_TEXT']).subscribe(values => {
      this.config.set('ios', 'backButtonText', values.BACK_BUTTON_TEXT);
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }

  logout(): void {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.userService.logout().then(
      () => {
        this.nav.setRoot(FirstRunPage);
      }
    );
  }
}
