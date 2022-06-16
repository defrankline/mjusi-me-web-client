import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {TrainingComponent} from "./training.component";
import {DeleteComponent} from "./delete/delete.component";
import {FormComponent} from "./form/form.component";
import {ViewComponent} from "./view/view.component";

const routes: Routes = [
  {path: '', component: TrainingComponent},
  {path: 'create', component: FormComponent},
  {path: 'view/:id', component: ViewComponent},
  {path: 'edit/:id', component: FormComponent},
  {path: 'delete/:id', component: DeleteComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TrainingRoutingModule { }
