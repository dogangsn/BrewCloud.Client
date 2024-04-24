import { Component, Inject, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ajaxSetup } from '@devexpress/analytics-core/analytics-utils';
import { AuthService } from 'app/core/services/auth/auth.service';
import { ReportService } from 'app/core/services/reports/report.service';
import { DxReportViewerComponent } from 'devexpress-reporting-angular';
import { environment } from 'environments/environment';
import { AsyncExportApproach } from 'devexpress-reporting/scopes/reporting-viewer-settings';
import { customerlistRptParameter } from '../models/customerlistRptParameter';
import { guid } from '@devexpress/analytics-core/analytics-internal';


@Component({ 
  selector: 'app-customerlistReport',
  standalone: true,
  templateUrl: './customerlistReport.component.html',
  styleUrls: ['./customerlistReport.component.scss',
  // '../../../../../../../../node_modules/jquery-ui/themes/base/all.css',
  // '../../../../../../../../node_modules/devexpress-richedit/dist/dx.richedit.css',
  '../../../../../../../node_modules/@devexpress/analytics-core/dist/css/dx-analytics.common.css',
  '../../../../../../../node_modules/@devexpress/analytics-core/dist/css/dx-analytics.light.css',
  '../../../../../../../node_modules/@devexpress/analytics-core/dist/css/dx-querybuilder.css',
  '../../../../../../../node_modules/devexpress-reporting/dist/css/dx-webdocumentviewer.css',
  '../../../../../../../node_modules/devexpress-reporting/dist/css/dx-reportdesigner.css'],
  encapsulation: ViewEncapsulation.None
})

export class customerlistReportComponent implements OnInit {
    @ViewChild('pmsrpt1090', { static: false }) viewer: DxReportViewerComponent;
    invokeAction: string = '/DXXRDV';
    reportName = '1090';
    host = environment.apiUrl + 'reports/'; //'http://localhost:5010/services/reports/';
    model: customerlistRptParameter
  
    constructor(
      private _dialogRef: MatDialogRef<any>,
      private _authService: AuthService,
      private _reportService: ReportService,
  
      @Inject(MAT_DIALOG_DATA) public data: customerlistRptParameter
  
    ) { 
      this.model = data;
  
      const token = this._authService.accessToken;
      ajaxSetup.ajaxSettings = {
        headers: {
          // eslint-disable-next-line @typescript-eslint/naming-convention
          'Authorization': 'Bearer ' + token
        }
      };
      AsyncExportApproach(true);
  
    }
  
    ngOnInit() {
      this.getReports();
    }
  
    getReports(): void {
      this.reportName =this.model.reportId.toString();
      const jsonText = JSON.stringify(this.model);
      const model = {
        name: this.reportName,
        filterJson: jsonText
      };
      this._reportService.createFilter(model).subscribe((response) => {
        if (response.isSuccessful) {
          debugger;
          response.data = guid();
          const params = new URLSearchParams();
          params.set('id', response.data);
          const url = this.reportName;
          this.viewer.bindingSender.OpenReport(url + '?' + params.toString()+'?'+ "Pms" +'?pmsrpt1090' );
        }
      }, (err) => {
        console.log(err);
      });
    }

    closeDialog(): void {
      this._dialogRef.close({ status: null });
    }
  
    BeforeRender(pEvent: any) {  
      pEvent.args.reportPreview.zoom(1);  
    }  
  
  }