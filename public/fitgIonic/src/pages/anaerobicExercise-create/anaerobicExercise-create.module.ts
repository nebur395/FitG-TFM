import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';

import { AnaerobicExerciseCreatePage } from './anaerobicExercise-create';

@NgModule({
  declarations: [
    AnaerobicExerciseCreatePage,
  ],
  imports: [
    IonicPageModule.forChild(AnaerobicExerciseCreatePage),
    TranslateModule.forChild()
  ],
  exports: [
    AnaerobicExerciseCreatePage
  ]
})
export class AnaerobicExerciseCreatePageModule { }
