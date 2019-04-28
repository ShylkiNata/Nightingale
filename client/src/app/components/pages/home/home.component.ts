import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

import { Employee, User, Table } from '../../../core/models';
import { AlertService, EmployeeService, PositionService } from '../../../core/services';
import { EmployeeModalComponent } from '../../particles';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormControl } from "@angular/forms";

import { faPlus, faTrash, faPencilAlt } from '@fortawesome/free-solid-svg-icons';

@Component({
    templateUrl: 'home.component.html'
})

export class HomeComponent implements OnInit {
    fa: Object = {
        plus: faPlus,
        edit: faPencilAlt,
        remove: faTrash
    };

    employees: Employee[] = [];
    table:Table = new Table();

    constructor(private employerService: EmployeeService,
                private modalService: NgbModal,
                private positionService: PositionService,
                private alertService: AlertService) { }

    ngOnInit() {
        this.fetchEmployeeList();
        this.fetchPositionList();
    }

    private async fetchPositionList() {
        this.positionService.read();
    }

    private async fetchEmployeeList() {
        this.employerService.search(this.table).pipe(first()).subscribe(data => {
            this.employees = data.docs;

            let table = this.table;
            let receivedParams = (({ docs, ...table }) => ({...table}))(data);
            Object.assign(this.table, receivedParams);
        });
    }

    private updatePage(page: number) {
        this.table.page = page;
        this.fetchEmployeeList();
    }

    search(value: string) {
        this.fetchEmployeeList();
    }

    edit(employee: Employee = new Employee()) {
        const modalRef = this.modalService.open(EmployeeModalComponent);
        modalRef.componentInstance.updateEmployeeList.subscribe(() => {
            this.fetchEmployeeList().then(() => {
                modalRef.close();
            });
        });
        modalRef.componentInstance.employee = employee;
    }

    delete(id: number) {
        this.employerService.delete(id).subscribe(
            data => {
                this.fetchEmployeeList();
                this.alertService.success('Employee has been removed', true);
            },
            error => {
                this.alertService.error(error);
            });
    }
}