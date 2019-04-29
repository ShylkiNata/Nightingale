import {Component, Input, forwardRef, OnChanges, EventEmitter, Output, OnInit} from '@angular/core';
import { Datepicker } from "../../../core/models";
import {NgbCalendar, NgbDate} from '@ng-bootstrap/ng-bootstrap';
import { ControlValueAccessor, FormGroup, NG_VALUE_ACCESSOR } from "@angular/forms";

@Component({
    selector: 'datepicker',
    templateUrl: './datepicker.component.html',
})

export class DatepickerComponent implements OnInit {
    @Output() updateDate = new EventEmitter();
    @Input() disabledCls:boolean = false;
    @Input() initial: string;

    private dp: Datepicker;

    constructor(private calendar: NgbCalendar) {
        this.dp = new Datepicker(calendar);
    }

    onChange(event: NgbDate): void {
        this.updateDate.emit(this.dp.toStr());
    }

    ngOnInit(): void {
        this.dp.value = this.dp.toNgbDate(this.initial);
    }
}