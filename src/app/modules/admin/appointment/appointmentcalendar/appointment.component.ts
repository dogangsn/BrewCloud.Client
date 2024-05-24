import { Component, OnInit, ViewEncapsulation, Injectable } from '@angular/core';
import { ChangeDetectionStrategy } from '@angular/core';
import { Subject } from 'rxjs';
import {
    CalendarEvent,
    CalendarEventTimesChangedEvent,
    CalendarView,
} from 'angular-calendar';
import {
    addDays,
    addHours,
    isSameDay,
    setDay,
    startOfDay,
    subDays,
    subSeconds,
} from 'date-fns';
import { AddApponitnmentDialogComponent } from './add-apponitnment-dialog/add-apponitnment-dialog.component';
import { TranslocoService } from '@ngneat/transloco';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { AppointmentService } from 'app/core/services/appointment/appointment.service';

@Component({
    selector: 'app-appointment',
    templateUrl: './appointment.component.html',
    styleUrls: ['./appointment.component.css'],
})
export class AppointmentComponent implements OnInit {
    appointmentsData: Appointment[];

    currentDate: Date = new Date();

    constructor(
        private _dialog: MatDialog,
        private _translocoService: TranslocoService,
        private router: Router,
        private route: ActivatedRoute,
        private _appointmentService: AppointmentService,
    ) {
        //this.appointmentsData = appointments;
    }

    ngOnInit(): void {
        this.getApponitmentList();
    }

    getApponitmentList() {
        const model = {
            appointmentType: 0
        }
        this._appointmentService.getAppointmentslist(model).subscribe((response) => {
            this.appointmentsData = response.data.map(appointment => {
                return {
                    ...appointment,
                    color: this.getRandomColor()
                };
            });
            console.log(this.appointmentsData);
        });
    }

    getRandomColor(): string {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

    addPanelOpen(): void {

        const model = {
            visibleCustomer: true,
        };

        const dialog = this._dialog
            .open(AddApponitnmentDialogComponent, {
                maxWidth: '100vw !important',
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
    color: string;
}
