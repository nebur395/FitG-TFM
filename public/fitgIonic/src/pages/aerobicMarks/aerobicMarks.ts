import {Component} from '@angular/core';
import {
  IonicPage,
  NavController,
  ModalController,
  ToastController, NavParams
} from 'ionic-angular';

import {AerobicExercise} from "../../models/AerobicExercise";
import {AerobicMark} from "../../models/AerobicMark";
import {Storage} from "@ionic/storage";

import {UserService} from '../../providers/providers';
import {MarksService} from '../../providers/providers';
import {Observable} from "rxjs/Observable";
import {FirstRunPage} from '../pages';


@IonicPage()
@Component({
  selector: 'page-aerobicMarks',
  templateUrl: 'aerobicMarks.html'
})
export class AerobicMarksPage {
  storage: Storage = new Storage(null);
  aerobicExercise: AerobicExercise;
  marksList: AerobicMark[] = [];
  marksShowList: Map<string, boolean> = new Map<string,boolean>();

  constructor(
    private navCtrl: NavController,
    private navParams: NavParams,
    private modalCtrl: ModalController,
    private toastCtrl: ToastController,
    private marksService: MarksService,
    private userService: UserService
  ) {
    this.aerobicExercise = this.navParams.get('exercise');
    this.marksService.getAerobicMarks(this.aerobicExercise._id)
      .then((observable: Observable<any>) => {
        observable.subscribe((resp) => {

          this.marksList = resp.marks as AerobicMark[];
          for (let i = 0; i < this.marksList.length; i++) {
            this.marksShowList.set(this.marksList[i]._id, false);
          }
          this.marksList.reverse();
        }, (err) => {
          this.errorHandler(err.status, err.error.message)
        });
      });
  }

  /**
   * Prompt the user to add a new mmber. This shows our MemberCreatePageComponent in a
   * modal and then adds the new member to our data source if the user created one.
   */
  addAerobicMark(): void {
    let addModal = this.modalCtrl.create('AerobicMarkCreatePage');
    addModal.onDidDismiss((mark) => {
      if (mark) {
            this.marksService.addAerobicMark(this.aerobicExercise._id, mark)
              .then((observable: Observable<any>) => {
                observable.subscribe((resp) => {

                    let newMark = resp.mark as AerobicMark;
                    // User created
                    let toast = this.toastCtrl.create({
                      message: "Aerobic mark successfully created.",
                      position: 'bottom',
                      duration: 3000,
                      cssClass: 'toast-success'
                    });
                    toast.present();
                    this.marksList.unshift(newMark);
                    this.marksShowList.set(newMark._id, false);

                  }, (err) => {
                    this.errorHandler(err.status, err.error.message)
                  });
              }
            );
      }
    });
    addModal.present();
  }

  modifyAerobicMark(mark): void {
    let addModal = this.modalCtrl.create('AerobicMarkCreatePage', {mark: mark});
    addModal.onDidDismiss((mark) => {
      if (mark) {
        this.marksService.modifyAerobicMark(this.aerobicExercise._id, mark)
          .then((observable: Observable<any>) => {
              observable.subscribe((resp) => {

                  let index = this.marksList.findIndex(index => index._id === mark._id);
                  this.marksList[index] = mark;

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

  deleteAerobicMark(mark): void {
    this.marksService.deleteAerobicMark(this.aerobicExercise._id, mark)
      .then((observable: Observable<any>) => {
        observable.subscribe((resp) => {

          let toast = this.toastCtrl.create({
            message: resp.message,
            position: 'bottom',
            duration: 3000,
            cssClass: 'toast-success'
          });
          toast.present();

          let index = this.marksList.findIndex(index => index._id === mark._id);
          this.marksList.splice(index, 1);
          this.marksShowList.delete(mark._id);

        }, (err) => {
          this.errorHandler(err.status, err.error.message)
        });
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
