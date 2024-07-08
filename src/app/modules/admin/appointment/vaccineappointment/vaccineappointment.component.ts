import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslocoService } from '@ngneat/transloco';
import { CalendarEvent } from 'angular-calendar';
import { AppointmentService } from 'app/core/services/appointment/appointment.service';
import { VaccineCalendarService } from 'app/core/services/vaccinecalendar/vaccinecalendar.service';
import { AddApponitnmentDialogComponent } from '../appointmentcalendar/add-apponitnment-dialog/add-apponitnment-dialog.component';

@Component({
  selector: 'app-vaccineappointment',
  templateUrl: './vaccineappointment.component.html',
  styleUrls: ['./vaccineappointment.component.css']
})
export class VaccineappointmentComponent implements OnInit {

  appointmentsData: Appointment[];

  currentDate: Date = new Date();
  loader = true;
  constructor(
    private _dialog: MatDialog,
    private _translocoService: TranslocoService,
    private router: Router,
    private route: ActivatedRoute,
    private _appointmentService: AppointmentService,
    private _vaccineAppointmentService: VaccineCalendarService
  ) { }

  ngOnInit() {
    this.getApponitmentList();
  }

  getApponitmentList() {
    this._vaccineAppointmentService.allVaccineAppointmentsList().subscribe((response)=>{
      this.appointmentsData = response.data;
      this.loader = false;
    })
  }

  addPanelOpen(): void {

    const model = {
        visibleCustomer: true,
        selectedAppointment : null
    };
    const dialog = this._dialog
        .open(AddApponitnmentDialogComponent, { 
            minWidth: '1000px',
            disableClose: true,
            data: model,
        })
        .afterClosed()
        .subscribe((response) => {
            if (response.status) {
                this.getApponitmentList();
            }
        });
}

  day(event: CalendarEvent, title: string): string {
    return event.title;
  }

  onAppointmentDeleted(e) {
    //this.showToast('Deleted', e.appointmentData.text, 'warning');
    console.log(e.appointmentsData.text)
  }

}


export class Appointment {
  text: string;
  startDate: Date;
  endDate: Date;
  allDay?: boolean;
}
