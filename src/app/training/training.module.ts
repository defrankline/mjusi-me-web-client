import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TrainingRoutingModule } from './training-routing.module';
import { TrainingComponent } from './training.component';
import { FormComponent } from './form/form.component';
import { ViewComponent } from './view/view.component';
import {DeleteComponent} from "./delete/delete.component";
import {SharedModule} from "../shared.module";

@NgModule({
  declarations: [
    TrainingComponent,
    FormComponent,
    ViewComponent,
    DeleteComponent
  ],
  imports: [
    CommonModule,
    TrainingRoutingModule,
    SharedModule
  ]
})
export class TrainingModule { }
