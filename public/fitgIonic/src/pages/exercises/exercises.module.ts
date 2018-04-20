import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';

import { ExercisesPage } from './exercises';

@NgModule({
  declarations: [
    ExercisesPage,
  ],
  imports: [
    IonicPageModule.forChild(ExercisesPage),
    TranslateModule.forChild()
  ],
  exports: [
    ExercisesPage
  ]
})
export class ExercisesPageModule { }
