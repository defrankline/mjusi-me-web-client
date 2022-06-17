import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DataCollectionRoutingModule } from './data-collection-routing.module';
import { DataCollectionComponent } from './data-collection.component';
import { FormComponent } from './form/form.component';
import { DeleteComponent } from './delete/delete.component';
import {SharedModule} from "../shared.module";


@NgModule({
  declarations: [
    DataCollectionComponent,
    FormComponent,
    DeleteComponent
  ],
  imports: [
    CommonModule,
    DataCollectionRoutingModule,
    SharedModule
  ]
})
export class DataCollectionModule { }
