import {Component} from '@angular/core';
import {
  IonicPage,
  NavController,
  ModalController,
  ToastController, NavParams
} from 'ionic-angular';

import {AnaerobicExercise} from "../../models/AnaerobicExercise";
import {AnaerobicMark} from "../../models/AnaerobicMark";
import {Storage} from "@ionic/storage";

import {UserService} from '../../providers/providers';
import {MarksService} from '../../providers/providers';
import {Observable} from "rxjs/Observable";
import {FirstRunPage} from '../pages';


@IonicPage()
@Component({
  selector: 'page-anaerobicMarks',
  templateUrl: 'anaerobicMarks.html'
})
export class AnaerobicMarksPage {
  storage: Storage = new Storage(null);
  anaerobicExercise: AnaerobicExercise;
  marksList: AnaerobicMark[] = [];
  marksShowList: Map<string, boolean> = new Map<string,boolean>();

  constructor(
    private navCtrl: NavController,
    private navParams: NavParams,
    private modalCtrl: ModalController,
    private toastCtrl: ToastController,
    private marksService: MarksService,
    private userService: UserService
  ) {
    this.anaerobicExercise = this.navParams.get('exercise');
    this.marksService.getAnaerobicMarks(this.anaerobicExercise._id)
      .then((observable: Observable<any>) => {
        observable.subscribe((resp) => {

          this.marksList = resp.marks as AnaerobicMark[];
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
  addAnaerobicMark(): void {
    let addModal = this.modalCtrl.create('AnaerobicMarkCreatePage');
    addModal.onDidDismiss((mark) => {
      if (mark) {
            this.marksService.addAnaerobicMark(this.anaerobicExercise._id, mark)
              .then((observable: Observable<any>) => {
                observable.subscribe((resp) => {

                    let newMark = resp.mark as AnaerobicMark;
                    // User created
                    let toast = this.toastCtrl.create({
                      message: "Anaerobic mark successfully created.",
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

  modifyAnaerobicMark(mark): void {
    let addModal = this.modalCtrl.create('AnaerobicMarkCreatePage', {mark: mark});
    addModal.onDidDismiss((mark) => {
      if (mark) {
        this.marksService.modifyAnaerobicMark(this.anaerobicExercise._id, mark)
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

  deleteAnaerobicMark(mark): void {
    this.marksService.deleteAnaerobicMark(this.anaerobicExercise._id, mark)
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
