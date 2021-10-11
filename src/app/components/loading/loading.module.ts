import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { LoadingComponent } from './loading.component';

@NgModule({
  declarations: [LoadingComponent],
  imports: [
    CommonModule,
    FlexLayoutModule,
    MatProgressSpinnerModule
  ],
  exports: [LoadingComponent]
})
export class LoadingModule { }
