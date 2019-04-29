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
    positions:Array<Object>;

    loading = false;
    submitted = false;

    fa: Object = {
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

    get f() { return this.employeeForm.controls; }

    compareOptions(item1: Position, item2: Position) {
        return item1 && item2 ? item1.id === item2.id : item1 === item2;
    }

    ngOnInit() {
        this.employeeForm = this.formBuilder.group({
            full_name: [this.employee.full_name, Validators.required],
            sex: [this.employee.sex, Validators.required],
            contact_information: [this.employee.contact_information, Validators.required],
            date_of_birth: [this.employee.date_of_birth, Validators.required],
            salary: [this.employee.salary, Validators.required],
            position: [this.employee.position, Validators.required]
        });
    }

    onDateUpdate(value: string) {
        this.f['date_of_birth'].patchValue(value);
    }

    onSubmit() {
        this.submitted = true;
        this.loading = true;
        let action = null;

        if (this.employeeForm.invalid) {
            return;
        }

        if(!this.employee.id) {
            action = {
                entity: this.employeeService.create(this.employeeForm.value),
                message: `Employee ${this.employeeForm.value.full_name} has been added`
            }
        }
        else {
            action = {
                entity: this.employeeService.update(this.employeeForm.value, this.employee.id),
                message: `${this.employeeForm.value.full_name}'s data has been updated`
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