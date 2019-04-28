import {Component, EventEmitter, Input, Output, OnInit} from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Employee, Position } from "../../../core/models";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmployeeService, AlertService, PositionService } from "../../../core/services";
import { NgbCalendar, NgbDate } from '@ng-bootstrap/ng-bootstrap';
import { faCalendarDay, faDollarSign } from '@fortawesome/free-solid-svg-icons';
import { Observable } from "rxjs";

interface Action {
    entity: Observable<Object>,
    message: string
}

@Component({
    selector: 'employee-modal',
    templateUrl: './employee-modal.component.html',
})

export class EmployeeModalComponent implements OnInit {
    @Output() updateEmployeeList = new EventEmitter();
    @Input() employee:Employee = null;

    employeeForm: FormGroup;

    loading = false;
    submitted = false;
    positions:Array<Object>;

    fa: Object = {
        'calendar': faCalendarDay,
        'dollar': faDollarSign
    };

    constructor(
        private activeModal: NgbActiveModal,
        private formBuilder: FormBuilder,
        private alertService: AlertService,
        private employeeService: EmployeeService,
        private calendar: NgbCalendar,
        private positionService: PositionService
    ) {
        this.positions = this.positionService.get();
    }

    isDisabled = (date: NgbDate, current: {month: number}) => date.month !== current.month;
    isWeekend = (date: NgbDate) =>  this.calendar.getWeekday(date) >= 6;

    limits = {
        min: {year: new Date().getFullYear()-100, month: 1, day: 1},
        max: {year: new Date().getFullYear()-18, month: 12, day: 31},
    };

    get f() { return this.employeeForm.controls; }

    compareOptions(item1: Position, item2: Position) {
        return item1 && item2 ? item1.id === item2.id : item1 === item2;
    }

    ngOnInit() {
        let date_of_birth = null;

        if (this.employee.date_of_birth) {
            let date = new Date(this.employee.date_of_birth);
            date_of_birth = {
                year: date.getFullYear(),
                month: date.getMonth() + 1,
                day: date.getDate()
            };
        }
        this.employeeForm = this.formBuilder.group({
            full_name: [this.employee.full_name, Validators.required],
            sex: [this.employee.sex, Validators.required],
            contact_information: [this.employee.contact_information, Validators.required],
            date_of_birth: [date_of_birth, Validators.required],
            salary: [this.employee.salary, Validators.required],
            position: [this.employee.position, Validators.required]
        });
    }

    onSubmit() {
        this.submitted = true;

        if (this.employeeForm.invalid) {
            return;
        }

        this.loading = true;

        let data = this.employeeForm.value;
        data.date_of_birth = `${data.date_of_birth.year}-${data.date_of_birth.month}-${data.date_of_birth.day}`;

        let action = null;

        if(!this.employee.id) {
            action = {
                entity: this.employeeService.create(this.employeeForm.value),
                message: `Employee ${data.full_name} has been added`
            }
        }
        else {
            action = {
                entity: this.employeeService.update(this.employeeForm.value, this.employee.id),
                message: `${data.full_name}'s data has been updated`
            }
        }

        return this.subscribe(action);
    }

    subscribe(action: Action) {
        action.entity.subscribe(
            data => {
                this.updateEmployeeList.emit();
                this.alertService.success(action.message, true);
            },
            error => {
                this.alertService.error(error);
                this.loading = false;
            });
    }
}