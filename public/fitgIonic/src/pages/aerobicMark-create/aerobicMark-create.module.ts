import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';

import { AerobicMarkCreatePage } from './aerobicMark-create';

@NgModule({
  declarations: [
    AerobicMarkCreatePage,
  ],
  imports: [
    IonicPageModule.forChild(AerobicMarkCreatePage),
    TranslateModule.forChild()
  ],
  exports: [
    AerobicMarkCreatePage
  ]
})
export class AerobicMarkCreatePageModule { }
