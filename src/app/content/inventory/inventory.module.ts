import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { FlexLayoutModule } from '@angular/flex-layout';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';

import { InventoryService, InventoryResolve } from './inventory.service';

import { InventoryComponent } from './list/inventory.component';
import { FormComponent } from './form/form.component';

const routes: Routes = [
  {
    path      : '',
    component : InventoryComponent,
    resolve   : { res : InventoryService }
  },
  {
    path      : ':id',
    component : FormComponent,
    resolve   : { res : InventoryResolve }
  },
];

@NgModule({
  declarations: [InventoryComponent, FormComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    NgxDatatableModule,
    FlexLayoutModule,
    MatToolbarModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule
  ],
  exports: [RouterModule],
  providers: [InventoryService, InventoryResolve]
})
export class InventoryModule { }
