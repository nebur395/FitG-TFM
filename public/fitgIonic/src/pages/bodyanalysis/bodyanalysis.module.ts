import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';

import { BodyAnalysisPage } from './bodyanalysis';

@NgModule({
  declarations: [
    BodyAnalysisPage,
  ],
  imports: [
    IonicPageModule.forChild(BodyAnalysisPage),
    TranslateModule.forChild()
  ],
  exports: [
    BodyAnalysisPage
  ]
})
export class BodyAnalysisPageModule { }
