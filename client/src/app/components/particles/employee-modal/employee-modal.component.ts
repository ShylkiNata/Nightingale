import {Component, EventEmitter, Input, Output, OnInit} from '@angular/core';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Employee } from "../../../core/models";
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import {first} from "rxjs/operators";
import { EmployeeService, AlertService } from "../../../core/services";
import { NgbCalendar, NgbDate, NgbDateStruct, NgbRadioGroup } from '@ng-bootstrap/ng-bootstrap';
import { faCalendarDay } from '@fortawesome/free-solid-svg-icons';

@Component({
    selector: 'employee-modal',
    templateUrl: './employee-modal.component.html',
    styles: [`
    .custom-day {
      text-align: center;
      padding: 0.185rem 0.25rem;
      border-radius: 0.25rem;
      display: inline-block;
      width: 2rem;
    }
    .custom-day:hover, .custom-day.focused {
      background-color: #e6e6e6;
    }
    .weekend {
      background-color: #f0ad4e;
      border-radius: 1rem;
      color: white;
    }
    .hidden {
      display: none;
    }
  `]
})

export class EmployeeModalComponent implements OnInit {
    @Output() updateEmployeeList = new EventEmitter();
    @Input() employee:Employee = null;

    employeeForm: FormGroup;

    loading = false;
    submitted = false;
    faCalendarDay = faCalendarDay;

    constructor(
        private formBuilder: FormBuilder,
        public activeModal: NgbActiveModal,
        private alertService: AlertService,
        private employeeService: EmployeeService,
        private calendar: NgbCalendar
    ) {}

    isDisabled = (date: NgbDate, current: {month: number}) => date.month !== current.month;
    isWeekend = (date: NgbDate) =>  this.calendar.getWeekday(date) >= 6;

    limits = {
        min: {year: new Date().getFullYear()-100, month: 1, day: 1},
        max: {year: new Date().getFullYear()-18, month: 12, day: 31},
    };

    get f() { return this.employeeForm.controls; }

    ngOnInit() {
        let date = new Date(this.employee.date_of_birth);
        let date_of_birth = {
            year: date.getFullYear(),
            month: date.getMonth()+1,
            day: date.getDate()
        };

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

        if(!this.employee.id) {
            this.employeeService.create(this.employeeForm.value)
                .pipe(first())
                .subscribe(
                    data => {
                        this.updateEmployeeList.emit();
                        this.alertService.success('Employee added', true);
                    },
                    error => {
                        this.alertService.error(error);
                        this.loading = false;
                    });
        }
        else {
            this.employeeService.update(this.employeeForm.value, this.employee.id)
                .pipe(first())
                .subscribe(
                    data => {
                        this.updateEmployeeList.emit();
                        this.alertService.success('Employee has been updated', true);
                    },
                    error => {
                        this.alertService.error(error);
                        this.loading = false;
                    });
        }
    }
}