import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { CleanComponent } from './clean.component';

@NgModule({
  declarations: [CleanComponent],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [CleanComponent]
})
export class CleanModule { }
