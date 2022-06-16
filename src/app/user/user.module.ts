import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user.component';
import { ViewComponent } from './view/view.component';
import { FormComponent } from './form/form.component';
import { DeleteComponent } from './delete/delete.component';
import {SharedModule} from "../shared.module";


@NgModule({
  declarations: [
    UserComponent,
    ViewComponent,
    FormComponent,
    DeleteComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    SharedModule
  ]
})
export class UserModule { }
