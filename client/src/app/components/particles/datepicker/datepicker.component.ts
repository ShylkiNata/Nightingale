import { Component, Input } from '@angular/core';
import { Datepicker } from "../../../core/models";
import { NgbCalendar } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'datepicker',
    templateUrl: './datepicker.component.html',
})

export class DatepickerComponent {
    @Input() disabled:boolean = false;
    private dp: Datepicker;

    constructor(private calendar: NgbCalendar) {
        this.dp = new Datepicker(calendar);
    }
}