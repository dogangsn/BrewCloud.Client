import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import {
  ChangeDetectionStrategy
} from '@angular/core';
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

@Component({
  selector: 'app-appointment',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './appointment.component.html',
  encapsulation: ViewEncapsulation.None,
  styles: [
    `
      .invalid-position .cal-event {
        background-color: #ad2121 !important;
        color: #fff;
      }
    `,
  ],
})
export class AppointmentComponent {
  debugger
  view: CalendarView = CalendarView.Week;

  viewDate: Date = new Date();

  events: CalendarEvent[] = [
    {
      start: subDays(startOfDay(new Date()), 1),
      end: addDays(new Date(), 1),
      title: 'A 3 day event',
      color: colors.blue,
      allDay: true,
      resizable: {
        beforeStart: true,
        afterEnd: true,
      },
      draggable: true,
    },
    {
      start: addHours(startOfDay(setDay(new Date(), 3)), 2),
      end: subSeconds(addHours(startOfDay(setDay(new Date(), 3)), 3), 1),
      title: 'An short event',
      color: colors.yellow,
      resizable: {
        beforeStart: true,
        afterEnd: true,
      },
      draggable: true,
    },
    {
      start: addHours(startOfDay(setDay(new Date(), 3)), 5),
      end: subSeconds(addHours(startOfDay(setDay(new Date(), 3)), 10), 1),
      title: 'A draggable and resizable event',      
      color: colors.yellow,
      resizable: {
        beforeStart: true,
        afterEnd: true,
      },
      draggable: true,
    },
  ];

  refresh = new Subject<void>();

  validateEventTimesChanged = (
    { event, newStart, newEnd, allDay }: CalendarEventTimesChangedEvent,
    addCssClass = true
  ) => {
    if (event.allDay) {
      return true;
    }

    delete event.cssClass;
    // don't allow dragging or resizing events to different days
    const sameDay = isSameDay(newStart, newEnd);

    if (!sameDay) {
      return false;
    }

    // don't allow dragging events to the same times as other events
    const overlappingEvent = this.events.find((otherEvent) => {
      return (
        otherEvent !== event &&
        !otherEvent.allDay &&
        ((otherEvent.start < newStart && newStart < otherEvent.end) ||
          (otherEvent.start < newEnd && newStart < otherEvent.end))
      );
    });

    if (overlappingEvent) {
      if (addCssClass) {
        event.cssClass = 'invalid-position';
      } else {
        return false;
      }
    }

    return true;
  };

  eventTimesChanged(
    eventTimesChangedEvent: CalendarEventTimesChangedEvent
  ): void {
    delete eventTimesChangedEvent.event.cssClass;
    if (this.validateEventTimesChanged(eventTimesChangedEvent, false)) {
      const { event, newStart, newEnd } = eventTimesChangedEvent;
      event.start = newStart;
      event.end = newEnd;
      this.refresh.next();
    }
  }
  // calendarOptions: CalendarOptions = {
  //   plugins: [dayGridPlugin],
  //   initialView: 'dayGridMonth',
  //   weekends: false,
  //   events: [
  //     { title: '  Deniz Can TOŞUR', start: new Date() }
  //   ]
  // };
// export class AppointmentComponent implements OnInit {

//   constructor() { }

//   ngOnInit() {
//   }

 }
