import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';

import { AnaerobicMarkCreatePage } from './anaerobicMark-create';

@NgModule({
  declarations: [
    AnaerobicMarkCreatePage,
  ],
  imports: [
    IonicPageModule.forChild(AnaerobicMarkCreatePage),
    TranslateModule.forChild()
  ],
  exports: [
    AnaerobicMarkCreatePage
  ]
})
export class AnaerobicMarkCreatePageModule { }
