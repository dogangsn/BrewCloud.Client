import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';

@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  encapsulation: ViewEncapsulation.None,
  
})
export class AppointmentComponent {
  calendarOptions: CalendarOptions = {
    plugins: [dayGridPlugin],
    initialView: 'dayGridMonth',
    weekends: false,
    events: [
      { title: '  Deniz Can TOŞUR', start: new Date() }
    ]
  };
// export class AppointmentComponent implements OnInit {

//   constructor() { }

//   ngOnInit() {
//   }

 }
