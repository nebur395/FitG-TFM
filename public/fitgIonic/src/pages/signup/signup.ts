import {Component} from '@angular/core';
import {IonicPage, ToastController, MenuController} from 'ionic-angular';

import {UserService} from '../../providers/providers';

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html'
})
export class SignupPage {
  // The account fields for the login form.
  // If you're using the username field with or without email, make
  // sure to add it to the type
  account: {
    username: string,
    email: string,
    password: string,
    rePassword
  } = {
    username: '',
    email: '',
    password: '',
    rePassword: ''
  };


  constructor(
    private menu: MenuController,
    private user: UserService,
    private toastCtrl: ToastController
  ) {
  }

  ionViewDidEnter(): void {
    // the root left menu should be disabled on this page
    this.menu.enable(false);
  }

  ionViewWillLeave(): void {
    // enable the root left menu when leaving this page
    this.menu.enable(true);
  }

  doSignup() {
    // Attempt to login in through our User service
    this.user.signup(this.account).subscribe((resp: any) => {
      // User created
      let toast = this.toastCtrl.create({
        message: resp.message,
        position: 'bottom',
        duration: 3000,
        cssClass: 'toast-success'
      });
      toast.present();
    }, (err) => {

      // Unable to sign up
      let toast = this.toastCtrl.create({
        message: err.error.message,
        duration: 3000,
        position: 'bottom',
        cssClass: 'toast-error'
      });
      toast.present();
    });
  }
}
