import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {DashboardRoutingModule} from './dashboard-routing.module';
import {DashboardComponent} from './dashboard.component';
import {SharedModule} from "../shared.module";
import {ChartModule, HIGHCHARTS_MODULES} from 'angular-highcharts';
import * as more from 'highcharts/highcharts-more.src';
import * as exporting from 'highcharts/modules/exporting.src';
import { HighchartsChartModule } from 'highcharts-angular';

@NgModule({
  declarations: [
    DashboardComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SharedModule,
    ChartModule,
    HighchartsChartModule,
  ],
  providers: [
    {provide: HIGHCHARTS_MODULES, useFactory: () => [more, exporting]}
  ]
})
export class DashboardModule {
}
