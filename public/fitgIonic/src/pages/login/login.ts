import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { MenuController, IonicPage, NavController, ToastController } from 'ionic-angular';

import { UserService } from '../../providers/providers';
import { MainPage } from '../pages';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  // The account fields for the login form.
  // If you're using the username field with or without email, make
  // sure to add it to the type
  account: {
    email: string,
    password: string
  } = {
    email: '',
    password: ''
  };

  // Our translated text strings
  private loginErrorString: string;

  constructor(
    private navCtrl: NavController,
    private userService: UserService,
    private menu: MenuController,
    private toastCtrl: ToastController,
    private translateService: TranslateService
  ) {
    this.translateService.get('LOGIN_ERROR').subscribe((value) => {
      this.loginErrorString = value;
    })
  }

  ionViewDidEnter(): void {
    // the root left menu should be disabled on the tutorial page
    this.menu.enable(false);
  }

  ionViewWillLeave(): void {
    // enable the root left menu when leaving the tutorial page
    this.menu.enable(true);
  }


  // Attempt to login in through our User service
  doLogin() {
    this.userService.login(this.account).subscribe((resp) => {
      this.navCtrl.setRoot(MainPage, {}, {
        animate: true,
        direction: 'forward'
      });
    }, (err) => {
      // Unable to log in
      let toast = this.toastCtrl.create({
        message: err.error.message,
        duration: 3000,
        position: 'top',
        cssClass: 'toast-error'
      });
      toast.present();
    });
  }
}
