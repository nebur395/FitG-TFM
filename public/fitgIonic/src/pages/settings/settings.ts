import { Component, ViewChild }                 from '@angular/core';
import {ToastController, NavController, IonicPage} from 'ionic-angular';
import { Validators, FormBuilder, FormGroup }   from '@angular/forms';
import { Storage }                              from '@ionic/storage';

import { UserService }     from '../../providers/providers';

import { FirstRunPage } from '../pages';
import { User } from '../../models/User';

import { Observable } from "rxjs/Observable";

/**
 * The Settings page is a simple form that syncs with a Settings provider
 * to enable the user to customize settings for the app.
 *
 */
@IonicPage()
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html'
})
export class SettingsPage {
  @ViewChild('fileInput') fileInput;

  storage: Storage = new Storage(null);
  isReadyToSave: boolean;
  form: FormGroup;

  constructor(
    private navCtrl: NavController,
    private userService: UserService,
    private formBuilder: FormBuilder,
    private toastCtrl: ToastController
  ) {
    this.form = this.formBuilder.group({
      username: ['', Validators.required],
      email: ['', Validators.required],
      oldPassword: ['', Validators.required],
      password: ['']
    });

    // Watch the form for changes, and
    this.form.valueChanges.subscribe((v) => {
      this.isReadyToSave = this.form.valid;
    });

    this.storage.get('user').then(
      (user: User) => {
        if (user) {
          this.form.patchValue({
            username: user.username,
            email: user.email
          });
        }
      }
    );
  }

  saveUser(): void {
    let settings = {
      username: this.form.value.username,
      oldPassword: this.form.value.oldPassword,
      password : this.form.value.password,
      rePassword: this.form.value.password,
      email: this.form.value.email
    };
    this.userService.updateUser(settings).then(
      (observable: Observable<any>) => {
        observable.subscribe(
          (resp: any) => {

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
              position: 'bottom',
              duration: 3000,
              cssClass: 'toast-error'
            });
            toast.present();

            if (err.status === 401) {
              this.logout();
            }

          });
      }
    );
  }

  logout(): void {
    this.userService.logout().then(
      () => {
        this.navCtrl.setRoot(FirstRunPage, {}, {
          animate: true,
          direction: 'forward'
        });
      }
    );
  }

}
