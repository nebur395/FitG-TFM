import { Component, ViewChild }                 from '@angular/core';
import { Validators, FormBuilder, FormGroup }   from '@angular/forms';
import {IonicPage, NavParams, ViewController} from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'anaerobicExercise-create',
  templateUrl: 'anaerobicExercise-create.html'
})
export class AnaerobicExerciseCreatePage {
  @ViewChild('fileInput') fileInput;

  isReadyToSave: boolean;

  form: FormGroup;

  constructor (
    private viewCtrl: ViewController,
    private formBuilder: FormBuilder,
    private nameParam: NavParams
  ) {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      category: ['', Validators.required],
      type: ['', Validators.required],
      description: ['']
    });

    // Watch the form for changes, and
    this.form.valueChanges.subscribe((v) => {
      this.isReadyToSave = this.form.valid;
    });

    if (this.nameParam.get('exercise')) {
      this.form.setValue({
        name: this.nameParam.get('exercise').name,
        category: this.nameParam.get('exercise').category,
        type: this.nameParam.get('exercise').type,
        description: this.nameParam.get('exercise').description
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
    let exercise = this.nameParam.get('exercise');
    if (exercise) {
      exercise.name = this.form.value.name;
      exercise.category = this.form.value.category;
      exercise.type = this.form.value.type;
      exercise.description = this.form.value.description;
    } else {
      exercise = {
        name: this.form.value.name,
        category: this.form.value.category,
        type: this.form.value.type,
        description: this.form.value.description
      }
    }
    this.viewCtrl.dismiss(exercise);
  }
}
