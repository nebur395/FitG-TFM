import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';

import { AerobicExerciseCreatePage } from './aerobicExercise-create';

@NgModule({
  declarations: [
    AerobicExerciseCreatePage,
  ],
  imports: [
    IonicPageModule.forChild(AerobicExerciseCreatePage),
    TranslateModule.forChild()
  ],
  exports: [
    AerobicExerciseCreatePage
  ]
})
export class AerobicExerciseCreatePageModule { }
