import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';

import { AerobicMarksPage } from './aerobicMarks';

@NgModule({
  declarations: [
    AerobicMarksPage,
  ],
  imports: [
    IonicPageModule.forChild(AerobicMarksPage),
    TranslateModule.forChild()
  ],
  exports: [
    AerobicMarksPage
  ]
})
export class AerobicMarksPageModule { }
