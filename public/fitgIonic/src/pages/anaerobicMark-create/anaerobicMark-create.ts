import { Component, ViewChild }                 from '@angular/core';
import { FormBuilder, FormGroup }   from '@angular/forms';
import {IonicPage, NavParams, ViewController} from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'anaerobicMark-create',
  templateUrl: 'anaerobicMark-create.html'
})
export class AnaerobicMarkCreatePage {
  @ViewChild('fileInput') fileInput;

  isReadyToSave: boolean;

  form: FormGroup;

  constructor (
    private viewCtrl: ViewController,
    private formBuilder: FormBuilder,
    private nameParam: NavParams
  ) {
    this.form = this.formBuilder.group({
      repetitions: [''],
      weight: [''],
      time: [''],
      comment: ['']
    });

    // Watch the form for changes, and
    this.form.valueChanges.subscribe((v) => {
      this.isReadyToSave = this.form.valid;
    });

    if (this.nameParam.get('mark')) {
      this.form.setValue({
        repetitions: this.nameParam.get('mark').repetitions[0],
        weight: this.nameParam.get('mark').weight[0],
        time: this.nameParam.get('mark').time[0],
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
      mark.repetitions = [this.form.value.repetitions];
      mark.weight = [this.form.value.weight];
      mark.time = [this.form.value.time];
      mark.comment = this.form.value.comment;
    } else {
      mark = {
        repetitions: [this.form.value.repetitions],
        weight: [this.form.value.weight],
        time: [this.form.value.time],
        comment: this.form.value.comment
      }
    }
    this.viewCtrl.dismiss(mark);
  }
}
