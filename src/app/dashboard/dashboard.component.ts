import {Component, OnInit} from '@angular/core';
import * as Highcharts from 'highcharts';
import HeatmapModule from 'highcharts/modules/heatmap';
import {DataCollectionService} from "../data-collection/data-collection.service";
import {CustomResponse} from "../custom-response";
import {ReportWrapper} from "./report";

HeatmapModule(Highcharts);

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  Highcharts: typeof Highcharts = Highcharts;
  attendeeOptions!: Highcharts.Options;
  studentOptions!: Highcharts.Options;
  report: ReportWrapper | undefined;
  constructor(private service: DataCollectionService) {
  }

  ngOnInit(): void {
    this.loadDashboard();
  }


  loadDashboard(): void {
    this.service.report().subscribe((response:CustomResponse) => {
      this.report = response.data;
      this.attendeeOptions = {
        chart: {
          type: 'bar',
        },
        credits: {
          enabled: false
        },
        exporting: {
          enabled: true
        },
        title: {
          text: 'Training Attendance'
        },
        subtitle: {
          text: 'Male vs Female'
        },
        plotOptions: {
          pie: {
            innerSize: 100,
            depth: 45
          }
        },
        series: [{
          name: 'Count',
          data: [
            ['Males', this.report?.attendee?.male ? this.report.attendee?.male : 0],
            ['Females', this.report?.attendee?.female ? this.report?.attendee?.female : 0],
          ],
          type: 'column',
        }]
      };
      this.studentOptions = {
        chart: {
          type: 'bar',
        },
        credits: {
          enabled: false
        },
        exporting: {
          enabled: true
        },
        title: {
          text: 'Total Students'
        },
        subtitle: {
          text: 'Male vs Female'
        },
        plotOptions: {
          pie: {
            innerSize: 100,
            depth: 45
          }
        },
        series: [{
          name: 'Count',
          data: [
            ['Males', this.report?.student?.male ? this.report.student?.male : 0],
            ['Females', this.report?.student?.female ? this.report?.student?.female : 0],
          ],
          type: 'pie',
        }]
      };
    });
  }

  refresh() {
    this.loadDashboard();
  }
}
