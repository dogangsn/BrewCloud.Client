import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslocoService } from '@ngneat/transloco';
import { CalendarEvent } from 'angular-calendar';
import { AppointmentService } from 'app/core/services/appointment/appointment.service';

@Component({
  selector: 'app-vaccineappointment',
  templateUrl: './vaccineappointment.component.html',
  styleUrls: ['./vaccineappointment.component.css']
})
export class VaccineappointmentComponent implements OnInit {

  appointmentsData: Appointment[];

  currentDate: Date = new Date();

  constructor(
    private _dialog: MatDialog,
    private _translocoService: TranslocoService,
    private router: Router,
    private route: ActivatedRoute,
    private _appointmentService: AppointmentService,) { }

  ngOnInit() {
    this.getApponitmentList();
  }

  getApponitmentList() {
    const model = {
      appointmentType: 1
    }
    this._appointmentService.getAppointmentslist(model).subscribe((response) => {
      this.appointmentsData = response.data;
      console.log(response.data);
    });
  }

  addPanelOpen(): void {

    const model = {
      visibleCustomer: true,
    };

    const dialog = this._dialog
    // .open(AddApponitnmentDialogComponent, {
    //     maxWidth: '100vw !important',
    //     disableClose: true,
    //     data: model,
    // })
    // .afterClosed()
    // .subscribe((response) => {
    //     if (response.status) {
    //         this.getApponitmentList();
    //     }
    // });
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
