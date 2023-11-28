import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ChangeDetectionStrategy } from '@angular/core';
import { Subject } from 'rxjs';
import {
    CalendarEvent,
    CalendarEventTimesChangedEvent,
    CalendarView,
} from 'angular-calendar';
import { colors } from '../appointment/colors';
import {
    addDays,
    addHours,
    isSameDay,
    setDay,
    startOfDay,
    subDays,
    subSeconds,
} from 'date-fns';
import { AddApponitnmentDialogComponent } from './dialogs/add-apponitnment-dialog/add-apponitnment-dialog.component';
import { TranslocoService } from '@ngneat/transloco';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'app-appointment',
    templateUrl: './appointment.component.html',
    styleUrls: ['./appointment.component.css'],
    
})
export class AppointmentComponent {

    appointmentsData: Appointment[];

    currentDate: Date = new Date();

    constructor(
        private _dialog: MatDialog,
        private _translocoService: TranslocoService,
        private router: Router,
        private route: ActivatedRoute
    ) {
        this.appointmentsData = appointments;
    }


    addPanelOpen(): void {
        const dialog = this._dialog
            .open(AddApponitnmentDialogComponent, {
                maxWidth: '100vw !important',
                disableClose: true,
                data: null,
            })
            .afterClosed()
            .subscribe((response) => {
                if (response.status) {
                }
            });
    }

    day(event: CalendarEvent, title: string): string {
        return event.title;
      }
}



export class Appointment {
    text: string;
    startDate: Date;
    endDate: Date;
    allDay?: boolean;
  }
  
  const appointments: Appointment[] = [
    {
      text: 'Website Re-Design Plan',
      startDate: new Date('2023-11-26T16:30:00.000Z'),
      endDate: new Date('2023-11-26T18:30:00.000Z'),
    }, {
      text: 'Book Flights to San Fran for Sales Trip',
      startDate: new Date('2023-11-26T19:00:00.000Z'),
      endDate: new Date('2023-11-26T20:00:00.000Z'),
      allDay: true,
    }, {
      text: 'Install New Router in Dev Room',
      startDate: new Date('2023-11-26T21:30:00.000Z'),
      endDate: new Date('2023-11-26T22:30:00.000Z'),
    }, {
      text: 'Approve Personal Computer Upgrade Plan',
      startDate: new Date('2023-11-27T17:00:00.000Z'),
      endDate: new Date('2023-11-27T18:00:00.000Z'),
    }, {
      text: 'Final Budget Review',
      startDate: new Date('2023-11-27T19:00:00.000Z'),
      endDate: new Date('2023-11-27T20:35:00.000Z'),
    }, {
      text: 'New Brochures',
      startDate: new Date('2023-11-27T21:30:00.000Z'),
      endDate: new Date('2023-11-27T22:45:00.000Z'),
    }, {
      text: 'Install New Database',
      startDate: new Date('2023-11-28T16:45:00.000Z'),
      endDate: new Date('2023-11-28T18:15:00.000Z'),
    }, {
      text: 'Approve New Online Marketing Strategy',
      startDate: new Date('2023-11-28T19:00:00.000Z'),
      endDate: new Date('2023-11-28T21:00:00.000Z'),
    }, {
      text: 'Upgrade Personal Computers',
      startDate: new Date('2023-11-28T22:15:00.000Z'),
      endDate: new Date('2023-11-28T23:30:00.000Z'),
    }, {
      text: 'Customer Workshop',
      startDate: new Date('2023-11-29T18:00:00.000Z'),
      endDate: new Date('2023-11-29T19:00:00.000Z'),
      allDay: true,
    }, {
      text: 'Prepare 2023 Marketing Plan',
      startDate: new Date('2023-11-29T18:00:00.000Z'),
      endDate: new Date('2023-11-29T20:30:00.000Z'),
    }, {
      text: 'Brochure Design Review',
      startDate: new Date('2023-11-29T21:00:00.000Z'),
      endDate: new Date('2023-11-29T22:30:00.000Z'),
    }, {
      text: 'Create Icons for Website',
      startDate: new Date('2023-11-30T17:00:00.000Z'),
      endDate: new Date('2023-11-30T18:30:00.000Z'),
    }, {
      text: 'Upgrade Server Hardware',
      startDate: new Date('2023-11-30T21:30:00.000Z'),
      endDate: new Date('2023-11-30T23:00:00.000Z'),
    }, {
      text: 'Submit New Website Design',
      startDate: new Date('2023-11-30T23:30:00.000Z'),
      endDate: new Date('2023-05-01T01:00:00.000Z'),
    }, {
      text: 'Launch New Website',
      startDate: new Date('2023-11-30T19:20:00.000Z'),
      endDate: new Date('2023-11-30T21:00:00.000Z'),
    },
  ];