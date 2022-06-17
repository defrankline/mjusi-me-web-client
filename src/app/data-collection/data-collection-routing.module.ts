import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {DataCollectionComponent} from "./data-collection.component";
import {FormComponent} from "./form/form.component";
import {DeleteComponent} from "./delete/delete.component";

const routes: Routes = [
  {path: '', component: DataCollectionComponent},
  {path: 'create', component: FormComponent},
  {path: 'edit/:id', component: FormComponent},
  {path: 'delete/:id', component: DeleteComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DataCollectionRoutingModule { }
