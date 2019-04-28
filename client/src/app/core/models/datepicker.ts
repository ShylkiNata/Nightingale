import { faCalendarDay } from '@fortawesome/free-solid-svg-icons';
import {NgbCalendar, NgbDate, NgbDateStruct} from "@ng-bootstrap/ng-bootstrap";

interface Limits {
    min: NgbDateStruct;
    max: NgbDateStruct;
}

export class Datepicker {
    icon = faCalendarDay;
    isDisabled: Function;
    isWeekend: Function;
    limits: Limits;

    constructor(private calendar: NgbCalendar) {
        this.isDisabled = (date: NgbDate, current: {month: number}) => date.month !== current.month;
        this.isWeekend = (date: NgbDate) =>  this.calendar.getWeekday(date) >= 6;

        this.limits = {
            min: {year: new Date().getFullYear()-100, month: 1, day: 1},
            max: {year: new Date().getFullYear()-18, month: 12, day: 31},
        };
    }
}