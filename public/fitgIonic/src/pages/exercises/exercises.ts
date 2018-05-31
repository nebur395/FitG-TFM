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
  selector: 'page-exercise',
  templateUrl: 'exercises.html'
})
export class ExercisesPage {
  storage: Storage = new Storage(null);
  anaerobicExercises: AnaerobicExercise[] = [];
  anaerobicExercisesFiltered: AnaerobicExercise[] = [];
  aerobicExercises: AerobicExercise[] = [];
  aerobicExercisesFiltered: AerobicExercise[] = [];
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
          this.sortExercises(this.aerobicExercises);
          this.aerobicExercisesFiltered = this.aerobicExercises;

        }, (err) => {
          this.errorHandler(err.status, err.error.message)
        });
      })
      .then(
        this.exercisesService.getAnaerobicExercises()
          .then((observable: Observable<any>) => {
            observable.subscribe((resp) => {

              this.anaerobicExercises = resp.exercises as AnaerobicExercise[];
              this.sortExercises(this.anaerobicExercises);
              this.anaerobicExercisesFiltered = this.anaerobicExercises;

            }, (err) => {
              this.errorHandler(err.status, err.error.message)
            });
          })
      );
  }

  /**
   * Prompt the user to add a new mmber. This shows our MemberCreatePageComponent in a
   * modal and then adds the new member to our data source if the user created one.
   */
  addAnaerobicExercise(): void {
    let addModal = this.modalCtrl.create('AnaerobicExerciseCreatePage');
    addModal.onDidDismiss((exercise) => {
      if (exercise) {
            this.exercisesService.addAnaerobicExercise(exercise)
              .then((observable: Observable<any>) => {
                observable.subscribe((resp) => {

                    let newExercise = resp.exercise as AnaerobicExercise;
                    // User created
                    let toast = this.toastCtrl.create({
                      message: "Anaerobic exercise successfully created.",
                      position: 'bottom',
                      duration: 3000,
                      cssClass: 'toast-success'
                    });
                    toast.present();
                    this.anaerobicExercises.push(newExercise);

                  }, (err) => {
                    this.errorHandler(err.status, err.error.message)
                  });
              }
            );
      }
    });
    addModal.present();
  }

  addAerobicExercise(): void {
    let addModal = this.modalCtrl.create('AerobicExerciseCreatePage');
    addModal.onDidDismiss((exercise) => {
      if (exercise) {
        this.exercisesService.addAerobicExercise(exercise)
          .then((observable: Observable<any>) => {
            observable.subscribe((resp) => {

                let newExercise = resp.exercise as AerobicExercise;
                // User created
                let toast = this.toastCtrl.create({
                  message: "Aerobic exercise successfully created.",
                  position: 'bottom',
                  duration: 3000,
                  cssClass: 'toast-success'
                });
                toast.present();
                this.aerobicExercises.push(newExercise);

              }, (err) => {
                this.errorHandler(err.status, err.error.message)
              });
          }
        );
      }
    });
    addModal.present();
  }

  modifyAnaerobicExercise(exercise): void {
    let addModal = this.modalCtrl.create('AnaerobicExerciseCreatePage', {exercise: exercise});
    addModal.onDidDismiss((exercise) => {
      if (exercise) {
        this.exercisesService.modifyAnaerobicExercise(exercise)
          .then((observable: Observable<any>) => {
              observable.subscribe((resp) => {

                  let index = this.anaerobicExercises.findIndex(index => index._id === exercise._id);
                  this.anaerobicExercises[index] = exercise;

                  // User created
                  let toast = this.toastCtrl.create({
                    message: resp.message,
                    position: 'bottom',
                    duration: 3000,
                    cssClass: 'toast-success'
                  });
                  toast.present();

                }, (err) => {
                  this.errorHandler(err.status, err.error.message)
                });
            }
          );
      }
    });
    addModal.present();
  }

  modifyAerobicExercise(exercise): void {
    let addModal = this.modalCtrl.create('AerobicExerciseCreatePage', {exercise: exercise});
    addModal.onDidDismiss((exercise) => {
      if (exercise) {
        this.exercisesService.modifyAerobicExercise(exercise)
          .then((observable: Observable<any>) => {
              observable.subscribe((resp) => {

                  let index = this.aerobicExercises.findIndex(index => index._id === exercise._id);
                  this.aerobicExercises[index] = exercise;

                  // User created
                  let toast = this.toastCtrl.create({
                    message: resp.message,
                    position: 'bottom',
                    duration: 3000,
                    cssClass: 'toast-success'
                  });
                  toast.present();

                }, (err) => {
                  this.errorHandler(err.status, err.error.message)
                });
            }
          );
      }
    });
    addModal.present();
  }

  deleteAnaerobicExercise(exercise): void {
    this.exercisesService.deleteAnaerobicExercise(exercise)
      .then((observable: Observable<any>) => {
        observable.subscribe((resp) => {

          let toast = this.toastCtrl.create({
            message: resp.message,
            position: 'bottom',
            duration: 3000,
            cssClass: 'toast-success'
          });
          toast.present();

          let index = this.anaerobicExercises.findIndex(index => index._id === exercise._id);
          this.anaerobicExercises.splice(index, 1);

        }, (err) => {
          this.errorHandler(err.status, err.error.message)
        });
      })
  }

  deleteAerobicExercise(exercise): void {
    this.exercisesService.deleteAerobicExercise(exercise)
      .then((observable: Observable<any>) => {
        observable.subscribe((resp) => {

          let toast = this.toastCtrl.create({
            message: resp.message,
            position: 'bottom',
            duration: 3000,
            cssClass: 'toast-success'
          });
          toast.present();

          let index = this.aerobicExercises.findIndex(index => index._id === exercise._id);
          this.aerobicExercises.splice(index, 1);

        }, (err) => {
          this.errorHandler(err.status, err.error.message)
        });
      })
  }

  getItems(ev: any) {
    // Reset items back to all of the items
    this.aerobicExercisesFiltered = this.aerobicExercises;
    this.anaerobicExercisesFiltered = this.anaerobicExercises;

    // set val to the value of the searchbar
    let val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.aerobicExercisesFiltered = this.aerobicExercisesFiltered.filter((exercise) => {
        return (exercise.name.toLowerCase().indexOf(val.toLowerCase()) > -1);
      });
      this.anaerobicExercisesFiltered = this.anaerobicExercisesFiltered.filter((exercise) => {
        return (exercise.name.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  }

  /**
   * Navigate to the detail page for this depot.
   */
  openAnaerobicMark(exercise: AnaerobicExercise): void {
    this.navCtrl.push('AnaerobicMarksPage', {
      exercise: exercise
    });
  }

  openAerobicMark(exercise: AerobicExercise): void {
    this.navCtrl.push('AerobicMarksPage', {
      exercise: exercise
    });
  }

  sortExercises(exerciseList: any): void {
    exerciseList.sort(function (a, b) {
      const x = a.name.toLowerCase();
      const y = b.name.toLowerCase();
      if (x < y) {
        return -1;
      }
      if (x > y) {
        return 1;
      }
      return 0;
    })
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
