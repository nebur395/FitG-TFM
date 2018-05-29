import {Component} from '@angular/core';
import {
  IonicPage,
  NavController,
  ModalController,
  ToastController
} from 'ionic-angular';

import {BodyAnalysis} from "../../models/BodyAnalysis";
import {Storage} from "@ionic/storage";

import {UserService} from '../../providers/providers';
import {AnalysisService} from "../../providers/analysis.service";
import {Observable} from "rxjs/Observable";
import {FirstRunPage} from '../pages';


@IonicPage()
@Component({
  selector: 'page-bodyAnalysis',
  templateUrl: 'bodyanalysis.html'
})
export class BodyAnalysisPage {
  storage: Storage = new Storage(null);
  analysisList: BodyAnalysis[] = [];
  analysisShowList: Map<string, boolean> = new Map<string,boolean>();

  constructor(
    private navCtrl: NavController,
    private modalCtrl: ModalController,
    private toastCtrl: ToastController,
    private analysisService: AnalysisService,
    private userService: UserService
  ) {
    this.analysisService.getBodyAnalysis()
      .then((observable: Observable<any>) => {
        observable.subscribe((resp) => {

          this.analysisList = resp.analysis as BodyAnalysis[];
          for (let i = 0; i < this.analysisList.length; i++) {
            this.analysisShowList.set(this.analysisList[i]._id, false);
          }
          this.analysisList.reverse();
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
    let addModal = this.modalCtrl.create('BodyAnalysisCreatePage');
    addModal.onDidDismiss((analysis) => {
      if (analysis) {
            this.analysisService.addBodyAnalysis(analysis)
              .then((observable: Observable<any>) => {
                observable.subscribe((resp) => {

                    let newAnalysis = resp.analysis as BodyAnalysis;
                    // User created
                    let toast = this.toastCtrl.create({
                      message: "Body analysis successfully created.",
                      position: 'bottom',
                      duration: 3000,
                      cssClass: 'toast-success'
                    });
                    toast.present();
                    this.analysisList.unshift(newAnalysis);
                    this.analysisShowList.set(newAnalysis._id, false);

                  }, (err) => {
                    this.errorHandler(err.status, err.error.message)
                  });
              }
            );
      }
    });
    addModal.present();
  }

  modifyAnaerobicMark(analysis): void {
    let addModal = this.modalCtrl.create('BodyAnalysisCreatePage', {analysis: analysis});
    addModal.onDidDismiss((analysis) => {
      if (analysis) {
        this.analysisService.modifyBodyAnalysis(analysis)
          .then((observable: Observable<any>) => {
              observable.subscribe((resp) => {

                  let index = this.analysisList.findIndex(index => index._id === analysis._id);
                  this.analysisList[index] = analysis;

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

  deleteAnaerobicMark(analysis): void {
    this.analysisService.deleteBodyAnalysis(analysis)
      .then((observable: Observable<any>) => {
        observable.subscribe((resp) => {

          let toast = this.toastCtrl.create({
            message: resp.message,
            position: 'bottom',
            duration: 3000,
            cssClass: 'toast-success'
          });
          toast.present();

          let index = this.analysisList.findIndex(index => index._id === analysis._id);
          this.analysisList.splice(index, 1);
          this.analysisShowList.delete(analysis._id);

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
