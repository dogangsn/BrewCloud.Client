import { Component, OnInit, ViewEncapsulation, Injectable, ChangeDetectorRef } from '@angular/core';
import { ChangeDetectionStrategy } from '@angular/core';
import { from, Observable, Subject, takeUntil, zip } from 'rxjs';
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
import * as signalR from '@microsoft/signalR';
import { AppSignalRService } from 'app/core/services/signalR/appSignalRService.service';
import { UserService } from 'app/core/user/user.service';
import { UsersService } from 'app/core/services/settings/users/users.service';

@Component({
    selector: 'app-appointment',
    templateUrl: './appointment.component.html',
    styleUrls: ['./appointment.component.css'],
})
export class AppointmentComponent implements OnInit {
    appointmentsData: Appointment[];
    currentDate: Date = new Date();
    loader = true;

    hubConnection: signalR.HubConnection;
    receivedMessage: string;
    userId: string;
    users: any;
    action: any;
    appointmentCalendar:any
    destroy$: Subject<boolean> = new Subject<boolean>();
    resourcesData: any[] = [];

    constructor(
        private _dialog: MatDialog,
        private _translocoService: TranslocoService,
        private router: Router,
        private route: ActivatedRoute,
        private _appointmentService: AppointmentService,
        private signalRService: AppSignalRService,
        private _usersService: UsersService,
        private cdr: ChangeDetectorRef
    ) {
        const actions = localStorage.getItem('actions');
        if (actions) {
            this.action = JSON.parse(actions);
        }

        const appointment = this.action.find((item: any) => {
            return item.roleSettingDetails.some((detail: any) => detail.target === 'appointmentcalendar');
        });
    
        if (appointment) {
            this.appointmentCalendar = appointment.roleSettingDetails.find((detail: any) => detail.target === 'appointmentcalendar');
        } else {
            this.appointmentCalendar = null;
        }
        
        console.log(this.appointmentCalendar);
        //this.appointmentsData = appointments;
    }

    ngOnInit(): void {

        this.getApponitmentList();
        this.getUserInfo();

        zip(
            this.getUserInfo()

        ).pipe(
            takeUntil(this.destroy$)
        ).subscribe({
            next: (value) => {
                this.setUser(value[0])
            },
            error: (e) => {
                console.log(e);
            },
            complete: () => {
                this.hubCreateConnection();
            }
        });

        // this._userService.user$.subscribe((user) => {
        //     this.userId = user.id;
        // });

        // this.signalRService.startConnection().subscribe(() => {
        //     this.signalRService.receiveMessage().subscribe((message) => {
        //       this.receivedMessage = message;
        //     });
        //   });

    }


    getUserInfo(): Observable<any> {
        return this._usersService.getActiveUser();
    }

    setUser(response: any): void {
        if (response.data) {
            this.users = response.data;
        }
    }


    getApponitmentList() {
        const model = {
            appointmentType: 0
        }
        // const colors = ['#FF5733',  '#3357FF', '#FF33A1', '#A133FF'];
        this._appointmentService.getAppointmentslist(model).subscribe((response) => {
            
            // Benzersiz renkleri elde edin ve eşsiz ID'ler oluşturun
            const uniqueColors = Array.from(new Set(response.data.map((appointment) => appointment.colors)));
            this.resourcesData = uniqueColors.map((color, index) => ({
                id: index + 1,
                color: color
            }));

            // Renkleri bir sözlük olarak saklayarak kolay erişim sağlayın
            const colorIdMap = this.resourcesData.reduce((acc, resource) => {
                acc[resource.color] = resource.id;
                return acc;
            }, {} as Record<string, number>);

            // Randevulara colorId ve renkleri ekleyin
            this.appointmentsData = response.data.map((appointment) => {
                const colorId = colorIdMap[appointment.colors] || 1; // Eşleşen colorId bulunamazsa varsayılan ID'yi kullan
                return {
                    ...appointment,
                    colorId: colorId,
                    colors: appointment.colors // Renk alanını atama
                };
            });


            console.log(this.appointmentsData);
            console.log(this.resourcesData);

            this.loader = false;
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
            selectedAppointment: null
        };


        const dialog = this._dialog
            .open(AddApponitnmentDialogComponent, {
                // maxWidth: '800vw !important',
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

    startConnection = () => {

        this.hubConnection = new signalR.HubConnectionBuilder()
            .withUrl('http://localhost:5020/serviceHub', {
                skipNegotiation: true,
                transport: signalR.HttpTransportType.WebSockets
            }).build();


        this.hubConnection.start().then(() => {
            console.log("Hub Connect Startded")
        }).catch(err => console.log("Error while starting connection" + err))

    }

    sendMessage(message: string): void {
        this.signalRService.sendMessage(message);
    }


    hubCreateConnection(): void {
        const address = 'http://localhost:5020/serviceHub';
        if (this.hubConnection) {
            this.hubConnection.stop();
        }
        this.hubConnection = new signalR.HubConnectionBuilder()
            .configureLogging(signalR.LogLevel.Debug)
            .withAutomaticReconnect()
            .withUrl(address, {
                withCredentials: false,
                skipNegotiation: true,
                transport: signalR.HttpTransportType.WebSockets,
            })
            .build();

        this.hubConnection.onreconnected((connectionId) => {
            this.hubAddGroup();
        });

        this.hubConnection
            .start()
            .then(() => {
                this.hubAddGroup();
            })
            .catch((err) => {
                setTimeout(() => {
                    this.hubCreateConnection();
                }, 2000);
            });

        this.hubConnectionStatus();
        this.hubListener();
    }

    hubAddGroup(): void {
        console.log(this.userId);
        this.hubConnection.invoke('AddGroup', this.users.id).catch((err) => {
        });
    }

    hubConnectionStatus(): void {
        this.hubConnection.onreconnected((connectionId) => {
        });
    }

    hubListener(): void {


        this.hubConnection.on('refreshappointmentcalendar', (model: any) => {
            console.log(model);
            if (model.appointments.length > 0) {
                model.appointments.forEach((element) => {

                    const index = this.appointmentsData.findIndex(x => x.id === element.id);
                    if (index !== -1) {
                        this.appointmentsData[index] = element;
                    } else {
                        this.appointmentsData.push(element);
                    }

                    this.appointmentsData = this.appointmentsData.map(appointment => {
                        return {
                            ...appointment,
                            color: this.getRandomColor()
                        }
                    });

                });
                this.cdr.detectChanges();
            }

        });
    }



}

export class Appointment {
    id: string;
    text: string;
    startDate: Date;
    endDate: Date;
    allDay?: boolean;
    colors: string;
    colorId?: number;
}
