import { Component } from '@angular/core';
import { IonicPage, NavController, ModalController, ToastController } from 'ionic-angular';

import {AnaerobicExercise} from "../../models/AnaerobicExercise";
import {AerobicExercise} from "../../models/AerobicExercise";
import {Storage} from "@ionic/storage";

import { UserService } from '../../providers/providers';
import { ExercisesService } from '../../providers/providers';
import {Observable} from "rxjs/Observable";
import { FirstRunPage } from '../pages';


@IonicPage()
@Component({
  selector: 'page-cards',
  templateUrl: 'cards.html'
})
export class CardsPage {
  storage: Storage = new Storage(null);
  anaerobicExercises: AnaerobicExercise[] = [];
  aerobicExercises: AerobicExercise[] = [];
  loadingData: boolean = false;

  constructor(
    private navCtrl: NavController,
    private modalCtrl: ModalController,
    private toastCtrl: ToastController,
    private exercisesService: ExercisesService,
    private userService: UserService
  ) {
    this.loadingData = true;

    this.exercisesService.getAerobicExercises().then(
      (observable: Observable<any>) => {
        observable.subscribe(
          (resp) => {
            this.loadingData = false;

            this.aerobicExercises = resp.exercises as AerobicExercise[];

          }, (err) => {
            this.loadingData = false;

            // Unable to sign up
            let toast = this.toastCtrl.create({
              message: err.error.message,
              position: 'bottom',
              duration: 4000,
              cssClass: 'toast-error'
            });
            toast.present();

            if (err.status === 401) {
              this.tokenErrorHandler();
            }

          });
      }
    );
  }

  tokenErrorHandler(): void {
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
