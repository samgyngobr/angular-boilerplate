import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';

import { Error404Component } from './error404/error404.component';

@NgModule({
  declarations: [
    Error404Component
  ],
  imports: [
    CommonModule,
    FlexLayoutModule,
    MatButtonModule
  ]
})
export class ErrorModule { }
