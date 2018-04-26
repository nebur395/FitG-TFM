import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';

import { BodyAnalysisCreatePage } from './bodyAnalysis-create';

@NgModule({
  declarations: [
    BodyAnalysisCreatePage,
  ],
  imports: [
    IonicPageModule.forChild(BodyAnalysisCreatePage),
    TranslateModule.forChild()
  ],
  exports: [
    BodyAnalysisCreatePage
  ]
})
export class BodyAnalysisCreatePageModule { }
