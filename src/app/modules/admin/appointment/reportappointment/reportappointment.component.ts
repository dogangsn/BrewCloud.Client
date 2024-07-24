import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { ApexOptions } from 'ng-apexcharts';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import { ReportService } from 'app/core/services/reports/report.service';
import { AppointmentDashboardDto } from './models/appointmentDashboardDto';
import { ProjectService } from '../../dashboards/project.service';
import { Observable, Subject, takeUntil, zip } from 'rxjs';
import { Router } from '@angular/router';
import { project } from 'app/mock-api/dashboards/project/data';
import { AppointmentDataService } from './models/appointmentDataService';


export const MY_FORMATS = {
  parse: {
    dateInput: 'YYYY',
  },
  display: {
    dateInput: 'YYYY',
    monthYearLabel: 'YYYY',
    monthYearA11yLabel: 'YYYY',
  },
};

@Component({
  selector: 'app-reportappointment',
  templateUrl: './reportappointment.component.html',
  styleUrls: ['./reportappointment.component.css'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
    },
    {
      provide: MAT_DATE_FORMATS, useValue: MY_FORMATS
    },
  ],
})
export class ReportappointmentComponent implements OnInit, OnDestroy {

  chartGithubIssues: ApexOptions = {};
  data: any;
  private _unsubscribeAll: Subject<any> = new Subject<any>();

  loader = true;

  dashboards: AppointmentDashboardDto;
  destroy$: Subject<boolean> = new Subject<boolean>();


  constructor(
    private _reportService: ReportService,
    private cdr: ChangeDetectorRef,
    private _projectService: AppointmentDataService,
    private _router: Router
  ) {

  }
  ngOnDestroy(): void {
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
  }

  ngOnInit() {

    this.getDashboards();

    zip(
      this.getDashboards()
    ).pipe(
      takeUntil(this.destroy$)
    ).subscribe({
      next: (value) => {
        this.setDashboard(value[0])
      },
      error: (e) => {
        console.log(e);
      },
      complete: () => {

        this.loader = false
        this.data = this.createProjectData();
        this._prepareChartData();

      }
    });

  }

  getDashboards(): Observable<any> {
    return this._reportService.getAppointmentDashboard();
  }

  setDashboard(response: any): void {
    this.dashboards = response.data;
    console.log(this.dashboards);
  }

  private _prepareChartData(): void {
    // Github issues
    this.chartGithubIssues = {
      chart: {
        fontFamily: 'inherit',
        foreColor: 'inherit',
        height: '100%',
        type: 'line',
        toolbar: {
          show: false
        },
        zoom: {
          enabled: false
        }
      },
      colors: ['#64748B', '#94A3B8'],
      dataLabels: {
        enabled: true,
        enabledOnSeries: [0],
        background: {
          borderWidth: 0
        }
      },
      grid: {
        borderColor: 'var(--fuse-border)'
      },
      labels: this.data.githubIssues.labels,
      legend: {
        show: false
      },
      plotOptions: {
        bar: {
          columnWidth: '50%'
        }
      },
      series: this.data.githubIssues.series,
      states: {
        hover: {
          filter: {
            type: 'darken',
            value: 0.75
          }
        }
      },
      stroke: {
        width: [3, 0]
      },
      tooltip: {
        followCursor: true,
        theme: 'dark'
      },
      xaxis: {
        axisBorder: {
          show: false
        },
        axisTicks: {
          color: 'var(--fuse-border)'
        },
        labels: {
          style: {
            colors: 'var(--fuse-text-secondary)'
          }
        },
        tooltip: {
          enabled: false
        }
      },
      yaxis: {
        labels: {
          offsetX: -16,
          style: {
            colors: 'var(--fuse-text-secondary)'
          }
        }
      }
    };

  }

  createProjectData() {
    const thisWeekData = {
      newIssues: 214,
      closedIssues: 75,
      fixed: 3,
      wontFix: 4,
      reOpened: 8,
      needsTriage: 6,
      series: {
        newIssues: [
                  this.dashboards.monthlyAppointmentCounts[0],
                  this.dashboards.monthlyAppointmentCounts[1],
                  this.dashboards.monthlyAppointmentCounts[2],
                  this.dashboards.monthlyAppointmentCounts[3],
                  this.dashboards.monthlyAppointmentCounts[4],
                  this.dashboards.monthlyAppointmentCounts[5],
                  this.dashboards.monthlyAppointmentCounts[6],
                  this.dashboards.monthlyAppointmentCounts[7],
                  this.dashboards.monthlyAppointmentCounts[8],
                  this.dashboards.monthlyAppointmentCounts[9],
                  this.dashboards.monthlyAppointmentCounts[10],
                  this.dashboards.monthlyAppointmentCounts[11]
        ],
        closedIssues: [11, 10, 8, 11, 8, 10, 17, 43, 34, 20, 25, 22]
      }
    };

    const lastWeekData = {
      newIssues: 197,
      closedIssues: 72,
      fixed: 6,
      wontFix: 11,
      reOpened: 6,
      needsTriage: 5,
      series: {
        newIssues: [37, 32, 39, 27, 18, 24, 20, 43, 34, 20, 25, 22],
        closedIssues: [9, 8, 10, 12, 7, 11, 15, 43, 34, 20, 25, 22]
      }
    };

    return this._projectService.getGithubIssues(thisWeekData, lastWeekData);
  }


}






