import { Component, ViewChild }                 from '@angular/core';
import { Validators, FormBuilder, FormGroup }   from '@angular/forms';
import {IonicPage, NavParams, ViewController} from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'aerobicMark-create',
  templateUrl: 'aerobicMark-create.html'
})
export class AerobicMarkCreatePage {
  @ViewChild('fileInput') fileInput;

  isReadyToSave: boolean;

  form: FormGroup;

  constructor (
    private viewCtrl: ViewController,
    private formBuilder: FormBuilder,
    private nameParam: NavParams
  ) {
    this.form = this.formBuilder.group({
      distance: ['', Validators.required],
      time: ['', Validators.required],
      intensity: [''],
      heartRate: [''],
      comment: ['']
    });

    // Watch the form for changes, and
    this.form.valueChanges.subscribe((v) => {
      this.isReadyToSave = this.form.valid;
    });

    if (this.nameParam.get('mark')) {
      this.form.setValue({
        distance: this.nameParam.get('mark').distance,
        time: this.nameParam.get('mark').time,
        intensity: this.nameParam.get('mark').intensity,
        heartRate: this.nameParam.get('mark').heartRate,
        comment: this.nameParam.get('mark').comment
      });
    }
  }

  /**
   * The user cancelled, so we dismiss without sending data back.
   */
  cancel() {
    this.viewCtrl.dismiss();
  }

  /**
   * The user is done and wants to create, so return it
   * back to the presenter.
   */
  done() {
    if (!this.form.valid) { return; }
    let mark = this.nameParam.get('mark');
    if (mark) {
      mark.distance = this.form.value.distance;
      mark.time = this.form.value.time;
      mark.intensity = this.form.value.intensity;
      mark.heartRate = this.form.value.heartRate;
      mark.comment = this.form.value.comment;
    } else {
      mark = {
        distance: this.form.value.distance,
        time: this.form.value.time,
        intensity: this.form.value.intensity,
        heartRate: this.form.value.heartRate,
        comment: this.form.value.comment
      }
    }
    this.viewCtrl.dismiss(mark);
  }
}
