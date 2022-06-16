import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {FormComponent} from "../user/form/form.component";
import {ViewComponent} from "../user/view/view.component";
import {RoleComponent} from "./role.component";

const routes: Routes = [
  {path: '', component: RoleComponent},
  {path: 'create', component: FormComponent},
  {path: 'view/:id', component: ViewComponent},
  {path: 'edit/:id', component: FormComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RoleRoutingModule { }
