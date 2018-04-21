import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';

import { AnaerobicMarksPage } from './anaerobicMarks';

@NgModule({
  declarations: [
    AnaerobicMarksPage,
  ],
  imports: [
    IonicPageModule.forChild(AnaerobicMarksPage),
    TranslateModule.forChild()
  ],
  exports: [
    AnaerobicMarksPage
  ]
})
export class AnaerobicMarksPageModule { }
