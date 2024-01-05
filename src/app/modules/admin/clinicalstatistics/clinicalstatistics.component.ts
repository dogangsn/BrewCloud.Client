import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, ContentChild, Inject, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { ApexChart, ApexNonAxisChartSeries, ApexOptions, ApexResponsive } from 'ng-apexcharts';
import { ClinicalstatisticsDefaultService } from './clinicalstatisticsdefault.service';
import { Subject, takeUntil } from 'rxjs';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { PaymentMethodsDto } from '../definition/paymentmethods/models/PaymentMethodsDto';
import { PaymentMethodservice } from 'app/core/services/definition/paymentmethods/paymentmethods.service';
import * as _moment from 'moment';
import { default as _rollupMoment, Moment } from 'moment';
import { MatDatepicker, } from '@angular/material/datepicker';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import { clinicalstatisticsListDto, clinicalstatisticsListRequestDto, customersListClinicalStatisticsDto } from './models/clinicalstatisticsListDto';
import { graphicListDto, graphicListRequestDto } from './models/graphicListDto';
import { clinicalstatisticsResponseDto } from './models/clinicalstatisticsListDto';
import { ClinicalStatisticsService } from 'app/core/services/Clinicalstatistics/clinicalstatistics.service';
import { CustomerService } from 'app/core/services/customers/customers.service';

import { OnDestroy } from '@angular/core';
import { C } from '@fullcalendar/core/internal-common';


const moment = _rollupMoment || _moment;
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

export type ChartOptions = {
    series: ApexNonAxisChartSeries;
    chart: ApexChart;
    responsive: ApexResponsive[];
    labels: any;
    colors: string[];
};

@Component({
    selector: 'app-clinicalstatistics',
    templateUrl: './clinicalstatistics.component.html',
    styleUrls: ['./clinicalstatistics.component.css'],
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
export class ClinicalstatisticsComponent implements OnInit, AfterViewInit, OnDestroy {
    displayedColumns: string[] = ['customerId'
        , 'paymentType'
        , 'total',];
    displayedColumns2: string[] = ['total'
        , 'paymentType'
        , 'year',];
    displayedColumns3: string[] = ['paymentType'
        , 'total'
        , 'year',
        'month'];
    clinicalstatics: FormGroup;
    // chartVisitors: ApexOptions;
    payments: PaymentMethodsDto[] = [];
    @ViewChild(MatPaginator) paginator: MatPaginator;
    clinicalstaticscards: [] = [];
    clinicalstaticscardsSale: clinicalstatisticsListDto[] = [];
    clinicalstaticscardsBuy: clinicalstatisticsListDto[] = [];
    dataSource = new MatTableDataSource<any>(this.clinicalstaticscards);
    private _unsubscribeAll: Subject<any> = new Subject<any>();
    data: any;
    selectedMonthandYear: number | null = null;
    dates = new FormControl(moment());
    public selectedDateType: string;
    selectedYear: number;
    newGithubIssuesSeries: any;
    clinicalTotalAmountSale: clinicalstatisticsListDto[] = [];
    clinicalTotalAmountBuy: clinicalstatisticsListDto[] = [];
    clinicalTotalAmountWeek: clinicalstatisticsListDto[] = [];
    graphicList: graphicListDto[] = [];
   

    public chartOptions: Partial<ChartOptions>;
    chartGithubIssues: ApexOptions = {};
    chartTaskDistribution: ApexOptions = {};
    chartBudgetDistribution: ApexOptions = {};
    chartWeeklyExpenses: ApexOptions = {};
    chartMonthlyExpenses: ApexOptions = {};
    chartYearlyExpenses: ApexOptions = {};
    selectedProject: string = 'ACME Corp. Backend App';
    forms: FormGroup;
    selectedPaymetId: any;
    customerlist: customersListClinicalStatisticsDto[] = [];

    chartLanguage: ApexOptions;
    chartAge: ApexOptions;
    chartGender: ApexOptions;
    chartNewVsReturning: ApexOptions;

    constructor(
        private _analyticsService: ClinicalstatisticsDefaultService,
        private _paymentmethodsService: PaymentMethodservice,
        private _router: Router,
        private fb: FormBuilder,
        private clinicalStatisticService: ClinicalStatisticsService,
        private cdr: ChangeDetectorRef,
        private _customerListService: CustomerService,



    ) {
        // this.selectedPaymetId = datas;
        // this.forms = this.fb.group({
        //     paymentType1: ['', Validators.required],
        //     paymentType2: ['', Validators.required],
        //     paymentType3: ['', Validators.required],
        //     // ...
        // });
        


    }

    ngOnInit() {
        // this.newGithubIssuesSeries = { series :{
        //     'this-year': [
        //         {
        //             name: 'Satış Tutarı',
        //             type: 'line',
        //             data: [0, 0, 0, 0, 0, 0,
        //                 0, 0, 0, 0, 0, 0]
        //         },
        //         {
        //             name: 'Alış Tutarı',
        //             type: 'column',
        //             data: [0, 0, 0, 0, 0, 0,
        //                 0, 0, 0, 0, 0, 0]
        //         }
        //     ],
        //     'last-year': [
        //         {
        //             name: 'Satış Tutarı',
        //             type: 'line',
        //             data: [0, 0, 0, 0, 0, 0,
        //                 0, 0, 0, 0, 0, 0]
        //         },
        //         {
        //             name: 'Alış Tutarı',
        //             type: 'column',
        //             data: [0, 0, 0, 0, 0, 0,
        //                 0, 0, 0, 0, 0, 0]
        //         }
        //     ]
        // }}
        this.newGithubIssuesSeries = { series :{
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
                'new-issues'   : 0,
                'closed-issues': 0,
                'fixed'        : 0,
                'wont-fix'     : 0,
                're-opened'    : 0,
                'needs-triage' : 0
            },
            'last-year': {
                'new-issues'   : 0,
                'closed-issues': 0,
                'fixed'        : 0,
                'wont-fix'     : 0,
                're-opened'    : 0,
                'needs-triage' : 0
            }
        },
    }
        this.paymentsList();
        this.getCustomerList();
        this.getGraphicList(1);
        // this.getBuyTotalAmount();
        debugger;
        this.getAllList(1);
        this.clinicalstatics = this.fb.group({
            paymentType1: ['', Validators.required],
            dates: ['', Validators.required],
        });
        this._analyticsService.data$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((data) => {
                // Store the data
                this.data = data;

                // Prepare the chart data
                this._prepareChartData();
            });
        this.chartOptions = {
            series: [31, 11, 55, 22, 43, 23, 66],
            chart: {
                width: 500,
                type: "pie"
            },
            labels: ["Pazartesi", "Salı", "Çarşamba", "Perşembe", "Cuma", "Cumartesi", "Pazar"],
            responsive: [
                {
                    breakpoint: 480,
                    options: {
                        chart: {
                            width: 300
                        },
                        legend: {
                            position: "bottom"
                        }
                    }
                }
            ],
            colors: ['#ff0000', '#00ff00', '#0000ff', '#ffa500', '#ff00ff', '#00ffff', '#000000'],



        };


        // Attach SVG fill fixer to all ApexCharts
        window['Apex'] = {
            chart: {
                events: {
                    mounted: (chart: any, options?: any): void => {
                        this._fixSvgFill(chart.el);
                    },
                    updated: (chart: any, options?: any): void => {
                        this._fixSvgFill(chart.el);
                    }
                }
            }
        };

    }
    ngAfterViewInit() {
        this._paymentmethodsService
            .getPaymentMethodsList()
            .subscribe((response) => {
                if (response.data.length !== 0) {
                    const recId = response.data[0].recId;
                    this.clinicalstatics = this.fb.group({
                        paymentType1: [recId, Validators.required],
                        dates: ['', Validators.required],
                    });
                    this.cdr.markForCheck();

                }

            });
        // this.clinicalstatics.patchValue({
        //     paymentType1 : [this.payments[0].recId]
        // })
    }
    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next(null);
        this._unsubscribeAll.complete();
    }
    selectYear(event: Moment, datepickers: MatDatepicker<Moment>) {
        // const ctrlValue = this.date.value ?? moment();
        const ctrlValue = this.dates.value ?? moment();
        ctrlValue.year(event.year());
        // ctrlValue.month(event.month());
        this.dates.setValue(ctrlValue);
        datepickers.close();
    }
    onYearSelected(event: any): void {
        this.selectedMonthandYear = event;
    }

    private _prepareChartData(): void {
        // Github issues
        this.chartNewVsReturning = {
            chart: {
                animations: {
                    speed: 400,
                    animateGradually: {
                        enabled: false
                    }
                },
                fontFamily: 'inherit',
                foreColor: 'inherit',
                height: '100%',
                type: 'donut',
                sparkline: {
                    enabled: true
                }
            },
            colors: ['#3182CE', '#63B3ED'],
            labels: this.data.newVsReturning.labels,
            plotOptions: {
                pie: {
                    customScale: 0.9,
                    expandOnClick: false,
                    donut: {
                        size: '70%'
                    }
                }
            },
            series: this.data.newVsReturning.series,
            states: {
                hover: {
                    filter: {
                        type: 'none'
                    }
                },
                active: {
                    filter: {
                        type: 'none'
                    }
                }
            },
            tooltip: {
                enabled: true,
                fillSeriesColor: false,
                theme: 'dark',
                custom: ({
                    seriesIndex,
                    w
                }): string => `<div class="flex items-center h-8 min-h-8 max-h-8 px-3">
                                                    <div class="w-3 h-3 rounded-full" style="background-color: ${w.config.colors[seriesIndex]};"></div>
                                                    <div class="ml-2 text-md leading-none">${w.config.labels[seriesIndex]}:</div>
                                                    <div class="ml-2 text-md font-bold leading-none">${w.config.series[seriesIndex]}%</div>
                                                </div>`
            }
        };
        debugger;
        const ss = this.newGithubIssuesSeries.series;
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
             series: this.newGithubIssuesSeries.series,
             //series: this.data.githubIssues.series,
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
        // Task distribution
        this.chartTaskDistribution = {
            chart: {
                fontFamily: 'inherit',
                foreColor: 'inherit',
                height: '100%',
                type: 'polarArea',
                toolbar: {
                    show: false
                },
                zoom: {
                    enabled: false
                }
            },
            labels: this.data.taskDistribution.labels,
            legend: {
                position: 'bottom'
            },
            plotOptions: {
                polarArea: {
                    spokes: {
                        connectorColors: 'var(--fuse-border)'
                    },
                    rings: {
                        strokeColor: 'var(--fuse-border)'
                    }
                }
            },
            series: this.data.taskDistribution.series,
            states: {
                hover: {
                    filter: {
                        type: 'darken',
                        value: 0.75
                    }
                }
            },
            stroke: {
                width: 2
            },
            theme: {
                monochrome: {
                    enabled: true,
                    color: '#93C5FD',
                    shadeIntensity: 0.75,
                    shadeTo: 'dark'
                }
            },
            tooltip: {
                followCursor: true,
                theme: 'dark'
            },
            yaxis: {
                labels: {
                    style: {
                        colors: 'var(--fuse-text-secondary)'
                    }
                }
            }
        };

        // Budget distribution
        this.chartBudgetDistribution = {
            chart: {
                fontFamily: 'inherit',
                foreColor: 'inherit',
                height: '100%',
                type: 'radar',
                sparkline: {
                    enabled: true
                }
            },
            colors: ['#818CF8'],
            dataLabels: {
                enabled: true,
                formatter: (val: number): string | number => `${val}%`,
                textAnchor: 'start',
                style: {
                    fontSize: '13px',
                    fontWeight: 500
                },
                background: {
                    borderWidth: 0,
                    padding: 4
                },
                offsetY: -15
            },
            markers: {
                strokeColors: '#818CF8',
                strokeWidth: 4
            },
            plotOptions: {
                radar: {
                    polygons: {
                        strokeColors: 'var(--fuse-border)',
                        connectorColors: 'var(--fuse-border)'
                    }
                }
            },
            series: this.data.budgetDistribution.series,
            stroke: {
                width: 2
            },
            tooltip: {
                theme: 'dark',
                y: {
                    formatter: (val: number): string => `${val}%`
                }
            },
            xaxis: {
                labels: {
                    show: true,
                    style: {
                        fontSize: '12px',
                        fontWeight: '500'
                    }
                },
                categories: this.data.budgetDistribution.categories
            },
            yaxis: {
                max: (max: number): number => parseInt((max + 10).toFixed(0), 10),
                tickAmount: 7
            }
        };

        // Weekly expenses
        this.chartWeeklyExpenses = {
            chart: {
                animations: {
                    enabled: false
                },
                fontFamily: 'inherit',
                foreColor: 'inherit',
                height: '100%',
                type: 'line',
                sparkline: {
                    enabled: true
                }
            },
            colors: ['#22D3EE'],
            series: this.data.weeklyExpenses.series,
            stroke: {
                curve: 'smooth'
            },
            tooltip: {
                theme: 'dark'
            },
            xaxis: {
                type: 'category',
                categories: this.data.weeklyExpenses.labels
            },
            yaxis: {
                labels: {
                    formatter: (val): string => `$${val}`
                }
            }
        };

        // Monthly expenses
        this.chartMonthlyExpenses = {
            chart: {
                animations: {
                    enabled: false
                },
                fontFamily: 'inherit',
                foreColor: 'inherit',
                height: '100%',
                type: 'line',
                sparkline: {
                    enabled: true
                }
            },
            colors: ['#4ADE80'],
            series: this.data.monthlyExpenses.series,
            stroke: {
                curve: 'smooth'
            },
            tooltip: {
                theme: 'dark'
            },
            xaxis: {
                type: 'category',
                categories: this.data.monthlyExpenses.labels
            },
            yaxis: {
                labels: {
                    formatter: (val): string => `$${val}`
                }
            }
        };

        // Yearly expenses
        this.chartYearlyExpenses = {
            chart: {
                animations: {
                    enabled: false
                },
                fontFamily: 'inherit',
                foreColor: 'inherit',
                height: '100%',
                type: 'line',
                sparkline: {
                    enabled: true
                }
            },
            colors: ['#FB7185'],
            series: this.data.yearlyExpenses.series,
            stroke: {
                curve: 'smooth'
            },
            tooltip: {
                theme: 'dark'
            },
            xaxis: {
                type: 'category',
                categories: this.data.yearlyExpenses.labels
            },
            yaxis: {
                labels: {
                    formatter: (val): string => `$${val}`
                }
            }
        };
        this.chartLanguage = {
            chart: {
                animations: {
                    speed: 400,
                    animateGradually: {
                        enabled: false
                    }
                },
                fontFamily: 'inherit',
                foreColor: 'inherit',
                height: '100%',
                type: 'donut',
                sparkline: {
                    enabled: true
                }
            },
            colors: ['#805AD5', '#B794F4'],
            labels: this.data.language.labels,
            plotOptions: {
                pie: {
                    customScale: 0.9,
                    expandOnClick: false,
                    donut: {
                        size: '70%'
                    }
                }
            },
            series: this.data.language.series,
            states: {
                hover: {
                    filter: {
                        type: 'none'
                    }
                },
                active: {
                    filter: {
                        type: 'none'
                    }
                }
            },
            // tooltip    : {
            //     enabled        : true,
            //     fillSeriesColor: false,
            //     theme          : 'dark',
            //     custom         : ({
            //                           seriesIndex,
            //                           w
            //                       }): string => `<div class="flex items-center h-8 min-h-8 max-h-8 px-3">
            //                                         <div class="w-3 h-3 rounded-full" style="background-color: ${w.config.colors[seriesIndex]};"></div>
            //                                         <div class="ml-2 text-md leading-none">${w.config.labels[seriesIndex]}:</div>
            //                                         <div class="ml-2 text-md font-bold leading-none">${w.config.series[seriesIndex]}%</div>
            //                                     </div>`
            // }
        };

        this.chartAge = {
            chart: {
                animations: {
                    speed: 400,
                    animateGradually: {
                        enabled: false
                    }
                },
                fontFamily: 'inherit',
                foreColor: 'inherit',
                height: '100%',
                type: 'donut',
                sparkline: {
                    enabled: true
                }
            },
            colors: ['#DD6B20', '#F6AD55'],
            labels: this.data.age.labels,
            plotOptions: {
                pie: {
                    customScale: 0.9,
                    expandOnClick: false,
                    donut: {
                        size: '70%'
                    }
                }
            },
            series: this.data.age.series,
            states: {
                hover: {
                    filter: {
                        type: 'none'
                    }
                },
                active: {
                    filter: {
                        type: 'none'
                    }
                }
            },
            tooltip: {
                enabled: true,
                fillSeriesColor: false,
                theme: 'dark',
                custom: ({
                    seriesIndex,
                    w
                }): string => `<div class="flex items-center h-8 min-h-8 max-h-8 px-3">
                                                    <div class="w-3 h-3 rounded-full" style="background-color: ${w.config.colors[seriesIndex]};"></div>
                                                    <div class="ml-2 text-md leading-none">${w.config.labels[seriesIndex]}:</div>
                                                    <div class="ml-2 text-md font-bold leading-none">${w.config.series[seriesIndex]}%</div>
                                                </div>`
            }
        };
        this.chartGender = {
            chart: {
                animations: {
                    speed: 400,
                    animateGradually: {
                        enabled: false
                    }
                },
                fontFamily: 'inherit',
                foreColor: 'inherit',
                height: '100%',
                type: 'donut',
                sparkline: {
                    enabled: true
                }
            },
            colors: ['#319795', '#4FD1C5'],
            labels: this.data.gender.labels,
            plotOptions: {
                pie: {
                    customScale: 0.9,
                    expandOnClick: false,
                    donut: {
                        size: '70%'
                    }
                }
            },
            series: this.data.gender.series,
            states: {
                hover: {
                    filter: {
                        type: 'none'
                    }
                },
                active: {
                    filter: {
                        type: 'none'
                    }
                }
            },
            tooltip: {
                enabled: true,
                fillSeriesColor: false,
                theme: 'dark',
                custom: ({
                    seriesIndex,
                    w
                }): string => `<div class="flex items-center h-8 min-h-8 max-h-8 px-3">
                                                     <div class="w-3 h-3 rounded-full" style="background-color: ${w.config.colors[seriesIndex]};"></div>
                                                     <div class="ml-2 text-md leading-none">${w.config.labels[seriesIndex]}:</div>
                                                     <div class="ml-2 text-md font-bold leading-none">${w.config.series[seriesIndex]}%</div>
                                                 </div>`
            }
        };

    }
    private _fixSvgFill(element: Element): void {
        // Current URL
        const currentURL = this._router.url;

        // 1. Find all elements with 'fill' attribute within the element
        // 2. Filter out the ones that doesn't have cross reference so we only left with the ones that use the 'url(#id)' syntax
        // 3. Insert the 'currentURL' at the front of the 'fill' attribute value
        Array.from(element.querySelectorAll('*[fill]'))
            .filter(el => el.getAttribute('fill').indexOf('url(') !== -1)
            .forEach((el) => {
                const attrVal = el.getAttribute('fill');
                el.setAttribute('fill', `url(${currentURL}${attrVal.slice(attrVal.indexOf('#'))}`);
            });
    }
    getCustomerList() {
        this._customerListService.getcustomerlist().subscribe((response) => {
            this.customerlist = response.data;
            console.log(this.customerlist);

            // this.dataSource = new MatTableDataSource<customersListDto>(
            //     this.customerlist
            // );

            // this.dataSource.paginator = this.paginator;
            // console.log(this.customerlist);
        });
    }
    paymentsList() {
        this._paymentmethodsService
            .getPaymentMethodsList()
            .subscribe((response) => {
                this.payments = response.data;
                // console.log(this.payments);
            });
    }
    getGraphicList(number: number) {
        debugger;

        if (number === 1) {
            const dateYear = new Date();
            this.selectedYear = Number(dateYear.getFullYear());

        }
        if (number === 2) {
            const dateYear = new Date();
            this.selectedYear = Number(dateYear.getFullYear()) - 1;
        }
        const graphicRequest = new graphicListRequestDto(this.selectedYear)
        this.clinicalStatisticService.getGraphicList(graphicRequest).subscribe((response) => {
            debugger;
            this.graphicList = response.data;
            console.log(this.customerlist);
            if (this.graphicList.length > 0) {
                const satisList = this.graphicList[0];
                const satisListMonth = satisList.months[0];
                const alisList = this.graphicList[1];
                const alisListMonth = alisList.months[0];
                debugger;
                if (number === 1) {
                    debugger;
                    this.newGithubIssuesSeries = { series :{
                        'this-year': [
                            
                            {
                                name: alisList.name,
                                type: alisList.types,
                                data: [alisListMonth.ocak, alisListMonth.subat, alisListMonth.mart, alisListMonth.nisan, alisListMonth.mayis, alisListMonth.haziran,
                                alisListMonth.temmuz, alisListMonth.agustos, alisListMonth.eylul, alisListMonth.ekim, alisListMonth.kasim, alisListMonth.aralik]
                            },
                            {
                                name: satisList.name,
                                type: satisList.types,
                                data: [satisListMonth.ocak, satisListMonth.subat, satisListMonth.mart, satisListMonth.nisan, satisListMonth.mayis, satisListMonth.haziran,
                                satisListMonth.temmuz, satisListMonth.agustos, satisListMonth.eylul, satisListMonth.ekim, satisListMonth.kasim, satisListMonth.aralik]
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
                            }
                        ]
                    }
                ,
                overview: {
                    'this-year': {
                        'new-issues'   : satisList.sumSatis,
                        'closed-issues': alisList.sumAlis,
                        'fixed'        : (satisList.netPriceSum + alisList.netPriceSum),
                        'wont-fix'     : (satisList.kdvSum + alisList.kdvSum),
                        're-opened'    : 0,
                        'needs-triage' : 0
                    },
                    'last-year': {
                        'new-issues'   : 0,
                        'closed-issues': 0,
                        'fixed'        : 0,
                        'wont-fix'     : 0,
                        're-opened'    : 0,
                        'needs-triage' : 0
                    }
                },
            }
                }
                if (number === 2) {
                    this.newGithubIssuesSeries = { series :{
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
                                name: alisList.name,
                                type: alisList.types,
                                data: [alisListMonth.ocak, alisListMonth.subat, alisListMonth.mart, alisListMonth.nisan, alisListMonth.mayis, alisListMonth.haziran,
                                alisListMonth.temmuz, alisListMonth.agustos, alisListMonth.eylul, alisListMonth.ekim, alisListMonth.kasim, alisListMonth.aralik]
                            },
                            {
                                name: satisList.name,
                                type: satisList.types,
                                data: [satisListMonth.ocak, satisListMonth.subat, satisListMonth.mart, satisListMonth.nisan, satisListMonth.mayis, satisListMonth.haziran,
                                satisListMonth.temmuz, satisListMonth.agustos, satisListMonth.eylul, satisListMonth.ekim, satisListMonth.kasim, satisListMonth.aralik]
                            }
                        ]

                    },
                    overview: {
                        'this-year': {
                            'new-issues'   : 0,
                            'closed-issues': 0,
                            'fixed'        : 0,
                            'wont-fix'     : 0,
                            're-opened'    : 0,
                            'needs-triage' : 0
                        },
                        'last-year': {
                            'new-issues'   : satisList.sumSatis,
                            'closed-issues': alisList.sumAlis,
                            'fixed'        : (satisList.netPriceSum + alisList.netPriceSum),
                            'wont-fix'     : (satisList.kdvSum + alisList.kdvSum),
                            're-opened'    : 0,
                            'needs-triage' : 0
                        }
                        
                    },
                }
                }
            }
            else{
                this.newGithubIssuesSeries = { series :{
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
                        'new-issues'   : 0,
                        'closed-issues': 0,
                        'fixed'        : 0,
                        'wont-fix'     : 0,
                        're-opened'    : 0,
                        'needs-triage' : 0
                    },
                    'last-year': {
                        'new-issues'   : 0,
                        'closed-issues': 0,
                        'fixed'        : 0,
                        'wont-fix'     : 0,
                        're-opened'    : 0,
                        'needs-triage' : 0
                    }
                },
            }
            }
            debugger;
            this._analyticsService.data$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((data) => {
                // Store the data
                this.data = data;

                // Prepare the chart data
                this._prepareChartData();
            });
            debugger;
            window['Apex'] = {
                chart: {
                    events: {
                        mounted: (chart: any, options?: any): void => {
                            this._fixSvgFill(chart.el);
                        },
                        updated: (chart: any, options?: any): void => {
                            this._fixSvgFill(chart.el);
                        }
                    }
                }
            };
            // this.chartGithubIssues.series = this.newGithubIssuesSeries.series;
            this.cdr.markForCheck();
            


        });
    }
    getAllList(num: number) {
        const dates = this.dates.getRawValue();



        const paymentType = num === 2 ? this.getFormValueByName('paymentType1') : '0';
        const ThisWeekCustomerTotal = new clinicalstatisticsListRequestDto(
            '0',
            paymentType,
            dates.year(),
            '',
            '00000000-0000-0000-0000-000000000000',
            2,
            num,

        );
        const PaymentTypeTotal = new clinicalstatisticsListRequestDto(
            '0',
            paymentType,
            dates.year(),
            '',
            '00000000-0000-0000-0000-000000000000',
            3,
            num,
        );
        const PaymentTypeYearsTotal = new clinicalstatisticsListRequestDto(
            '0',
            paymentType,
            dates.year(),
            '',
            '00000000-0000-0000-0000-000000000000',
            4,
            num,
        );
        debugger;
        const clinicalStatisticItem = new clinicalstatisticsResponseDto(
            ThisWeekCustomerTotal,
            PaymentTypeTotal,
            PaymentTypeYearsTotal
        );
        this.clinicalStatisticService.getClinicalstatisticsList(clinicalStatisticItem)
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((response) => {
                if (response && response.data) {
                    if (num === 1) {
                        this.clinicalTotalAmountWeek = response.data.filter(x => x.requestType === 2)
                        this.cdr.markForCheck();
                        //   console.log(this.clinicalTotalAmount);
                        this.clinicalTotalAmountWeek = response.data.filter(x => x.requestType === 2)
                        if (this.clinicalTotalAmountWeek.length !== 0) {
                            debugger;
                            this.clinicalTotalAmountWeek.forEach(item => {
                                debugger;
                                const payType = item.paymentType;
                                const custemerId = item.customerId;
                                item.paymentType = this.payments.find(x => x.recId === payType).name;
                                const custemer = this.customerlist.find(x => x.id === custemerId);
                                item.customerId = custemer.firstName + ' ' + custemer.lastName;
                            });
                            this.cdr.markForCheck();
                            //   this.clinicalstaticscardsBuy[0].paymenttype = this.payments.find(x=>x.recId === this.clinicalTotalAmountBuy[0].paymenttype).name;
                        }
                        this.clinicalTotalAmountBuy = response.data.filter(x => x.requestType === 3)
                        this.cdr.markForCheck();
                        //   console.log(this.clinicalTotalAmount);
                        this.clinicalstaticscardsBuy = response.data.filter(x => x.requestType === 3)
                        if (this.clinicalstaticscardsBuy.length !== 0) {
                            debugger;
                            this.clinicalstaticscardsBuy.forEach(item => {
                                const payType = item.paymentType;
                                item.paymentType = this.payments.find(x => x.recId === payType).name
                            });
                            this.cdr.markForCheck();
                            //   this.clinicalstaticscardsBuy[0].paymenttype = this.payments.find(x=>x.recId === this.clinicalTotalAmountBuy[0].paymenttype).name;
                        }

                    }

                    this.clinicalTotalAmountSale = response.data.filter(x => x.requestType === 4)
                    this.cdr.markForCheck();
                    //   console.log(this.clinicalTotalAmount);
                    this.clinicalstaticscardsSale = response.data.filter(x => x.requestType === 4)
                    debugger;
                    if (this.clinicalstaticscardsSale.length !== 0) {
                        this.clinicalstaticscardsSale.forEach(item => {
                            const payType = item.paymentType;
                            item.paymentType = this.payments.find(x => x.recId === payType).name
                        });
                        this.cdr.markForCheck();
                        //   this.clinicalstaticscardsSale[0].paymenttype = this.payments.find(x=>x.recId === this.clinicalTotalAmountSale[0].paymenttype).name;
                    }

                    // Diğer işlemleri burada gerçekleştirin.
                }
            });

    }
    getSaleTotalAmount() {
        this.getAllList(2);
        // const paymentType = this.getFormValueByName('paymentType1');

        // const dates = this.dates.getRawValue();
        // const clinicalStatisticItem = new clinicalstatisticsRequestDto(
        //     '0',
        //     paymentType,
        //     dates.year(),
        //     true,
        //     1
        // );
        // //this.getTransforid.id = ;


        // this.clinicalStatisticService.getClinicalstatisticsList(clinicalStatisticItem)
        //     .pipe(takeUntil(this._unsubscribeAll))
        //     .subscribe((response) => {
        //         if (response && response.data) {
        //             this.clinicalTotalAmountSale = response.data
        //             this.cdr.markForCheck();
        //             //   console.log(this.clinicalTotalAmount);
        //             this.clinicalstaticscardsSale = response.data
        //             debugger;
        //             if (this.clinicalstaticscardsSale.length !== 0) {
        //                 this.clinicalstaticscardsSale.forEach(item => {
        //                     const payType = item.paymenttype;
        //                     item.paymenttype = this.payments.find(x => x.recId === payType).name
        //                 });
        //                 this.cdr.markForCheck();
        //                 //   this.clinicalstaticscardsSale[0].paymenttype = this.payments.find(x=>x.recId === this.clinicalTotalAmountSale[0].paymenttype).name;
        //             }
        //             // Diğer işlemleri burada gerçekleştirin.
        //         }
        //     });
    }
    // getBuyTotalAmount() {
    //     debugger;
    //     // const paymentType = this.getFormValueByName('paymentType1');
    //     const date = new Date();
    //     const dates = this.dates.getRawValue();
    //     const clinicalStatisticItem = new clinicalstatisticsRequestDto(
    //         '0',
    //         '0',
    //         date.getFullYear(),
    //         false,
    //         2
    //     );
    //     //this.getTransforid.id = ;


    //     this.clinicalStatisticService.getClinicalstatisticsList(clinicalStatisticItem)
    //         .pipe(takeUntil(this._unsubscribeAll))
    //         .subscribe((response) => {
    //             if (response && response.data) {
    //                 debugger;

    //                 // Diğer işlemleri burada gerçekleştirin.
    //             }
    //         });
    // }
    getFormValueByName(formName: string): any {
        return this.clinicalstatics.get(formName).value;
    }
}

