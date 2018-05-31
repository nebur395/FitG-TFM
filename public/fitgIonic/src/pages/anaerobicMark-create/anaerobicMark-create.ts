import { Component, ViewChild }                 from '@angular/core';
import { FormBuilder, FormGroup, FormArray }   from '@angular/forms';
import {IonicPage, NavParams, ViewController} from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'anaerobicMark-create',
  templateUrl: 'anaerobicMark-create.html'
})
export class AnaerobicMarkCreatePage {
  @ViewChild('fileInput') fileInput;

  isReadyToSave: boolean;
  series: number = 1;

  form: FormGroup;

  constructor (
    private viewCtrl: ViewController,
    private formBuilder: FormBuilder,
    private nameParam: NavParams
  ) {
    this.form = this.formBuilder.group({
      series: this.formBuilder.array([
        this.newSerieInputDefinition()
      ]),
      comment: ['']
    });

    // Watch the form for changes, and
    this.form.valueChanges.subscribe((v) => {
      this.isReadyToSave = this.form.valid;
    });

    if (this.nameParam.get('mark')) {
      this.form.controls['comment'].setValue(this.nameParam.get('mark').comment);
      for (let i = 0; i < this.nameParam.get('mark').repetitions.length; i++) {
        let serie = {
          repetitions: this.nameParam.get('mark').repetitions[i],
          weight: this.nameParam.get('mark').weight[i],
          time: this.nameParam.get('mark').time[i]
        };
        this.addSerie(serie);
      }
      const control = <FormArray>this.form.controls.series;
      control.removeAt(0);
    }
  }

  newSerieInputDefinition(serie?: any) : FormGroup {
    if (serie) {
      return this.formBuilder.group({
        repetitions: serie.repetitions,
        weight: serie.weight,
        time: serie.time
      });
    } else {
      return this.formBuilder.group({
        repetitions: [''],
        weight: [''],
        time: ['']
      });
    }
  }

  addSerie(serie?: any) {
    this.series++;
    const control = <FormArray>this.form.controls.series;
    control.push(this.newSerieInputDefinition(serie));
  }

  removeSerie() {
    if (this.series > 1) {
      const control = <FormArray>this.form.controls.series;
      control.removeAt(control.length-1);
      this.series--;
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
    if (!this.form.valid) {
      return;
    }
    let mark = this.nameParam.get('mark');
    if (mark) {
      mark.repetitions = [];
      mark.weight = [];
      mark.time = [];
      for (let i = 0; i < this.form.value.series.length; i++) {
        mark.repetitions.push(this.form.value.series[i].repetitions);
        mark.weight.push(this.form.value.series[i].weight);
        mark.time.push(this.form.value.series[i].time);

      }
      mark.comment = this.form.value.comment;
    } else {
      mark = {
        repetitions: [],
        weight: [],
        time: [],
        comment: this.form.value.comment
      };
      for (let i = 0; i < this.form.value.series.length; i++) {
        mark.repetitions.push(this.form.value.series[i].repetitions);
        mark.weight.push(this.form.value.series[i].weight);
        mark.time.push(this.form.value.series[i].time);

      }
    }
    for (let i = 0; i < mark.repetitions.length; i++) {
      if (!mark.repetitions[i]) {
        mark.repetitions = [];
      }
      if (!mark.weight[i]) {
        mark.weight = [];
      }
      if (!mark.time[i]) {
        mark.time = [];
      }
    }
    if ((mark.repetitions.length == 0) && (mark.weight.length == 0) && (mark.time.length == 0)) {
      return;
    }
    this.viewCtrl.dismiss(mark);
  }
}
