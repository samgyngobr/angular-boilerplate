import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainModule } from '../layout/main/main.module';
import { CleanModule } from '../layout/clean/clean.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  exports: [
    MainModule,
    CleanModule
  ]
})
export class LayoutModule { }
