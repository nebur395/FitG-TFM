import { Component, ViewChild }                 from '@angular/core';
import { FormBuilder, FormGroup }   from '@angular/forms';
import {IonicPage, NavParams, ViewController} from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-bodyAnalysis-create',
  templateUrl: 'bodyAnalysis-create.html'
})
export class BodyAnalysisCreatePage {
  @ViewChild('fileInput') fileInput;

  isReadyToSave: boolean;

  form: FormGroup;

  constructor (
    private viewCtrl: ViewController,
    private formBuilder: FormBuilder,
    private nameParam: NavParams
  ) {
    this.form = this.formBuilder.group({
      weight: [''],
      bmi: [''],
      metabolicAge: [''],
      basalMetabolism: [''],
      bodyFat: [''],
      muscleMass: [''],
      boneMass: [''],
      bodyFluids: [''],
      visceralAdiposity: [''],
      dailyCaloricIntake: ['']
    });

    // Watch the form for changes, and
    this.form.valueChanges.subscribe((v) => {
      this.isReadyToSave = this.form.valid;
    });

    if (this.nameParam.get('analysis')) {
      this.form.setValue({
        weight: this.nameParam.get('analysis').weight,
        bmi: this.nameParam.get('analysis').bmi,
        metabolicAge: this.nameParam.get('analysis').metabolicAge,
        basalMetabolism: this.nameParam.get('analysis').basalMetabolism,
        bodyFat: this.nameParam.get('analysis').bodyFat,
        muscleMass: this.nameParam.get('analysis').muscleMass,
        boneMass: this.nameParam.get('analysis').boneMass,
        bodyFluids: this.nameParam.get('analysis').bodyFluids,
        visceralAdiposity: this.nameParam.get('analysis').visceralAdiposity,
        dailyCaloricIntake: this.nameParam.get('analysis').dailyCaloricIntake
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
    let analysis = this.nameParam.get('analysis');
    if (analysis) {
      analysis.weight = this.form.value.weight;
      analysis.bmi = this.form.value.bmi;
      analysis.metabolicAge = this.form.value.metabolicAge;
      analysis.basalMetabolism = this.form.value.basalMetabolism;
      analysis.bodyFat = this.form.value.bodyFat;
      analysis.muscleMass = this.form.value.muscleMass;
      analysis.boneMass = this.form.value.boneMass;
      analysis.bodyFluids = this.form.value.bodyFluids;
      analysis.visceralAdiposity = this.form.value.visceralAdiposity;
      analysis.dailyCaloricIntake = this.form.value.dailyCaloricIntake;
    } else {
      analysis = {
        weight: this.form.value.weight,
        bmi: this.form.value.bmi,
        metabolicAge: this.form.value.metabolicAge,
        basalMetabolism: this.form.value.basalMetabolism,
        bodyFat: this.form.value.bodyFat,
        muscleMass: this.form.value.muscleMass,
        boneMass: this.form.value.boneMass,
        bodyFluids: this.form.value.bodyFluids,
        visceralAdiposity: this.form.value.visceralAdiposity,
        dailyCaloricIntake: this.form.value.dailyCaloricIntake
      }
    }
    this.viewCtrl.dismiss(analysis);
  }
}
