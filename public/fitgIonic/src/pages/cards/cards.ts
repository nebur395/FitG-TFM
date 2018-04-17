import {Component} from '@angular/core';
import {
  IonicPage,
  NavController,
  ModalController,
  ToastController
} from 'ionic-angular';

import {AnaerobicExercise} from "../../models/AnaerobicExercise";
import {AerobicExercise} from "../../models/AerobicExercise";
import {Storage} from "@ionic/storage";

import {UserService} from '../../providers/providers';
import {ExercisesService} from '../../providers/providers';
import {Observable} from "rxjs/Observable";
import {FirstRunPage} from '../pages';


@IonicPage()
@Component({
  selector: 'page-cards',
  templateUrl: 'cards.html'
})
export class CardsPage {
  storage: Storage = new Storage(null);
  anaerobicExercises: AnaerobicExercise[] = [];
  aerobicExercises: AerobicExercise[] = [];
  exerciseType: string = "anaerobic";

  constructor(
    private navCtrl: NavController,
    private modalCtrl: ModalController,
    private toastCtrl: ToastController,
    private exercisesService: ExercisesService,
    private userService: UserService
  ) {

    this.exercisesService.getAerobicExercises()
      .then((observable: Observable<any>) => {
        observable.subscribe((resp) => {

          this.aerobicExercises = resp.exercises as AerobicExercise[];

        }, (err) => {
          this.errorHandler(err.status, err.error.message)
        });
      })
      .then(
        this.exercisesService.getAnaerobicExercises()
          .then((observable: Observable<any>) => {
            observable.subscribe((resp) => {

              this.anaerobicExercises = resp.exercises as AnaerobicExercise[];

            }, (err) => {
              this.errorHandler(err.status, err.error.message)
            });
          })
      );
  }


  errorHandler(status: number, error: string): void {
    let toast = this.toastCtrl.create({
      message: error,
      position: 'bottom',
      duration: 3000,
      cssClass: 'toast-error'
    });
    toast.present();

    if (status === 401) {
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
}
