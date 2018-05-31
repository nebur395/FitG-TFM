import { Component } from '@angular/core';
import { IonicPage, NavController, MenuController } from 'ionic-angular';

/**
 * The Welcome Page is a splash page that quickly describes the app,
 * and then directs the user to create an account or log in.
 * If you'd like to immediately put the user onto a login/signup page,
 * we recommend not using the Welcome page.
*/
@IonicPage()
@Component({
  selector: 'page-welcome',
  templateUrl: 'welcome.html'
})
export class WelcomePage {

  constructor(
    private navCtrl: NavController,
    private menu: MenuController,
    ) { }

  ionViewDidEnter(): void {
    // the root left menu should be disabled on the tutorial page
    this.menu.enable(false);
  }

  ionViewWillLeave(): void {
    // enable the root left menu when leaving the tutorial page
    this.menu.enable(true);
  }

  ngAfterViewInit(): void {
    // Random bg, Math.random controls bg range [0..5]
    document.getElementById("splash-bg").style.backgroundImage =
      'url(assets/img/sports-' + (Math.floor(Math.random() * 5)) + '.png';
    setInterval(this.changeBgImg, 30000);
  }

  changeBgImg() {
    // Random bg, Math.random controls bg range [0..5]
    document.getElementById("splash-bg").style.backgroundImage =
      'url(assets/img/sports-' + (Math.floor(Math.random() * 5)) + '.png';
  }

  login() {
    this.navCtrl.push('LoginPage');
  }

  signup() {
    this.navCtrl.push('SignupPage');
  }
}
