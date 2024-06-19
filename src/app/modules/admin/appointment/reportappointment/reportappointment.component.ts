import { ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ApexOptions } from 'ng-apexcharts';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';

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
export class ReportappointmentComponent implements OnInit {

  chartGithubIssues: ApexOptions = {};
  chartTaskDistribution: ApexOptions = {};
  chartBudgetDistribution: ApexOptions = {};
  chartWeeklyExpenses: ApexOptions = {};
  chartMonthlyExpenses: ApexOptions = {};
  chartYearlyExpenses: ApexOptions = {};
  newGithubIssuesSeries: any;
  
  loader = true;
  constructor() { }
  ngOnInit() {
    this.loader = false

    this.newGithubIssuesSeries = {
      series: {
          'this-year': [

              {
                  name: 'Alış Tutarı',
                  type: 'column',
                  data: [0, 0, 0, 0, 0, 0,
                      0, 0, 0, 0, 0, 0]
              },
              {
                  name: 'Satış Tutarı',
                  type: 'line',
                  data: [0, 0, 0, 0, 0, 0,
                      0, 0, 0, 0, 0, 0]
              }
          ],
          'last-year': [

              {
                  name: 'Alış Tutarı',
                  type: 'column',
                  data: [0, 0, 0, 0, 0, 0,
                      0, 0, 0, 0, 0, 0]
              },
              {
                  name: 'Satış Tutarı',
                  type: 'line',
                  data: [0, 0, 0, 0, 0, 0,
                      0, 0, 0, 0, 0, 0]
              },
          ]
      },
      overview: {
          'this-year': {
              'new-issues': 0,
              'closed-issues': 0,
              'fixed': 0,
              'wont-fix': 0,
              're-opened': 0,
              'needs-triage': 0
          },
          'last-year': {
              'new-issues': 0,
              'closed-issues': 0,
              'fixed': 0,
              'wont-fix': 0,
              're-opened': 0,
              'needs-triage': 0
          }
      },
  }
  }



  getGraphicList(number: number) {

    // if (number === 1) {
    //   const dateYear = new Date();
    //   this.selectedYear = Number(dateYear.getFullYear());

    // }
    // if (number === 2) {
    //   const dateYear = new Date();
    //   this.selectedYear = Number(dateYear.getFullYear()) - 1;
    // }
    // const graphicRequest = new graphicListRequestDto(this.selectedYear)
    // this.clinicalStatisticService.getGraphicList(graphicRequest).subscribe((response) => {
    //   this.graphicList = response.data;
    //   console.log(this.customerlist);
    //   if (this.graphicList.length > 0) {
    //     const satisList = this.graphicList[0];
    //     const satisListMonth = satisList.months[0];
    //     const alisList = this.graphicList[1];
    //     const alisListMonth = alisList.months[0];
    //     if (number === 1) {
    //       this.newGithubIssuesSeries = {
    //         series: {
    //           'this-year': [

    //             {
    //               name: alisList.name,
    //               type: alisList.types,
    //               data: [alisListMonth.ocak, alisListMonth.subat, alisListMonth.mart, alisListMonth.nisan, alisListMonth.mayis, alisListMonth.haziran,
    //               alisListMonth.temmuz, alisListMonth.agustos, alisListMonth.eylul, alisListMonth.ekim, alisListMonth.kasim, alisListMonth.aralik]
    //             },
    //             {
    //               name: satisList.name,
    //               type: satisList.types,
    //               data: [satisListMonth.ocak, satisListMonth.subat, satisListMonth.mart, satisListMonth.nisan, satisListMonth.mayis, satisListMonth.haziran,
    //               satisListMonth.temmuz, satisListMonth.agustos, satisListMonth.eylul, satisListMonth.ekim, satisListMonth.kasim, satisListMonth.aralik]
    //             }
    //           ],
    //           'last-year': [

    //             {
    //               name: 'Alış Tutarı',
    //               type: 'column',
    //               data: [0, 0, 0, 0, 0, 0,
    //                 0, 0, 0, 0, 0, 0]
    //             },
    //             {
    //               name: 'Satış Tutarı',
    //               type: 'line',
    //               data: [0, 0, 0, 0, 0, 0,
    //                 0, 0, 0, 0, 0, 0]
    //             }
    //           ]
    //         }
    //         ,
    //         overview: {
    //           'this-year': {
    //             'new-issues': Number(satisList.sumSatis.toFixed(2)),
    //             'closed-issues': Number(alisList.sumAlis.toFixed(2)),
    //             'fixed': Number((satisList.netPriceSum + alisList.netPriceSum).toFixed(2)),
    //             'wont-fix': Number((satisList.kdvSum + alisList.kdvSum).toFixed(2)),
    //             're-opened': 0,
    //             'needs-triage': 0
    //           },
    //           'last-year': {
    //             'new-issues': 0,
    //             'closed-issues': 0,
    //             'fixed': 0,
    //             'wont-fix': 0,
    //             're-opened': 0,
    //             'needs-triage': 0
    //           }
    //         },
    //       }
    //     }
    //     if (number === 2) {
    //       this.newGithubIssuesSeries = {
    //         series: {
    //           'this-year': [

    //             {
    //               name: 'Alış Tutarı',
    //               type: 'column',
    //               data: [0, 0, 0, 0, 0, 0,
    //                 0, 0, 0, 0, 0, 0]
    //             },
    //             {
    //               name: 'Satış Tutarı',
    //               type: 'line',
    //               data: [0, 0, 0, 0, 0, 0,
    //                 0, 0, 0, 0, 0, 0]
    //             }
    //           ],
    //           'last-year': [

    //             {
    //               name: alisList.name,
    //               type: alisList.types,
    //               data: [alisListMonth.ocak, alisListMonth.subat, alisListMonth.mart, alisListMonth.nisan, alisListMonth.mayis, alisListMonth.haziran,
    //               alisListMonth.temmuz, alisListMonth.agustos, alisListMonth.eylul, alisListMonth.ekim, alisListMonth.kasim, alisListMonth.aralik]
    //             },
    //             {
    //               name: satisList.name,
    //               type: satisList.types,
    //               data: [satisListMonth.ocak, satisListMonth.subat, satisListMonth.mart, satisListMonth.nisan, satisListMonth.mayis, satisListMonth.haziran,
    //               satisListMonth.temmuz, satisListMonth.agustos, satisListMonth.eylul, satisListMonth.ekim, satisListMonth.kasim, satisListMonth.aralik]
    //             }
    //           ]

    //         },
    //         overview: {
    //           'this-year': {
    //             'new-issues': 0,
    //             'closed-issues': 0,
    //             'fixed': 0,
    //             'wont-fix': 0,
    //             're-opened': 0,
    //             'needs-triage': 0
    //           },
    //           'last-year': {
    //             'new-issues': satisList.sumSatis,
    //             'closed-issues': alisList.sumAlis,
    //             'fixed': (satisList.netPriceSum + alisList.netPriceSum),
    //             'wont-fix': (satisList.kdvSum + alisList.kdvSum),
    //             're-opened': 0,
    //             'needs-triage': 0
    //           }

    //         },
    //       }
    //     }
    //   }
    //   else {
    //     this.newGithubIssuesSeries = {
    //       series: {
    //         'this-year': [

    //           {
    //             name: 'Alış Tutarı',
    //             type: 'column',
    //             data: [0, 0, 0, 0, 0, 0,
    //               0, 0, 0, 0, 0, 0]
    //           },
    //           {
    //             name: 'Satış Tutarı',
    //             type: 'line',
    //             data: [0, 0, 0, 0, 0, 0,
    //               0, 0, 0, 0, 0, 0]
    //           }
    //         ],
    //         'last-year': [

    //           {
    //             name: 'Alış Tutarı',
    //             type: 'column',
    //             data: [0, 0, 0, 0, 0, 0,
    //               0, 0, 0, 0, 0, 0]
    //           },
    //           {
    //             name: 'Satış Tutarı',
    //             type: 'line',
    //             data: [0, 0, 0, 0, 0, 0,
    //               0, 0, 0, 0, 0, 0]
    //           },
    //         ]
    //       },
    //       overview: {
    //         'this-year': {
    //           'new-issues': 0,
    //           'closed-issues': 0,
    //           'fixed': 0,
    //           'wont-fix': 0,
    //           're-opened': 0,
    //           'needs-triage': 0
    //         },
    //         'last-year': {
    //           'new-issues': 0,
    //           'closed-issues': 0,
    //           'fixed': 0,
    //           'wont-fix': 0,
    //           're-opened': 0,
    //           'needs-triage': 0
    //         }
    //       },
    //     }
    //   }
    //   this._analyticsService.data$
    //     .pipe(takeUntil(this._unsubscribeAll))
    //     .subscribe((data) => {
    //       // Store the data
    //       this.data = data;

    //       // Prepare the chart data
    //       this._prepareChartData();
    //     });
    //   window['Apex'] = {
    //     chart: {
    //       events: {
    //         mounted: (chart: any, options?: any): void => {
    //           this._fixSvgFill(chart.el);
    //         },
    //         updated: (chart: any, options?: any): void => {
    //           this._fixSvgFill(chart.el);
    //         }
    //       }
    //     }
    //   };
    //   // this.chartGithubIssues.series = this.newGithubIssuesSeries.series;
    //   this.cdr.markForCheck();



    // });
  }

}
