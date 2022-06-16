import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import(`./dashboard/dashboard.module`).then(module => module.DashboardModule)
  },
  {
    path: 'trainings',
    loadChildren: () => import(`./training/training.module`).then(module => module.TrainingModule)
  },
  {
    path: 'students',
    loadChildren: () => import(`./user/user.module`).then(module => module.UserModule)
  },
  {
    path: '**',
    redirectTo: '',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
