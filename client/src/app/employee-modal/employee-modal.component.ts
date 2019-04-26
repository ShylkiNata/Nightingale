import {Component, EventEmitter, Input, Output, OnInit} from '@angular/core';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Employee } from "../_models";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {first} from "rxjs/operators";
import { EmployeeTransitService, AlertService } from "../_services";

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

    constructor(
        private formBuilder: FormBuilder,
        public activeModal: NgbActiveModal,
        private alertService: AlertService,
        private employeeService: EmployeeTransitService,
    ) {}

    get f() { return this.employeeForm.controls; }

    ngOnInit() {
        this.employeeForm = this.formBuilder.group({
            full_name: [this.employee.full_name, Validators.required],
            sex: [this.employee.sex, Validators.required],
            contact_information: [this.employee.contact_information, Validators.required],
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