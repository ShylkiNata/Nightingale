import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

import { Employee, User, Table } from '../../../core/models';
import { EmployeeService, PositionService } from '../../../core/services';
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
    positions: Array<Object>;
    table:Table = new Table();
    filter = new FormControl('');

    constructor(private employerService: EmployeeService,
                private modalService: NgbModal,
                private positionService: PositionService) {

        this.filter.valueChanges.pipe().subscribe(text => {
            this.table.page = 1;
            this.table.search = text;
            this.fetchEmployeeList();
        });
    }

    ngOnInit() {
        this.fetchEmployeeList();
        this.fetchPositionList();
    }

    private async fetchPositionList() {
        this.positionService.read().pipe(first()).subscribe(data => {
            this.positions = data;
        });
    }

    private async fetchEmployeeList() {
        this.employerService.search(this.table).pipe(first()).subscribe(data => {
            this.employees = data.docs;

            let table = this.table;
            this.table = (({ docs, ...table }) => ({...table}))(data)
        });
    }

    private updatePage(page: number) {
        this.table.page = page;
        this.fetchEmployeeList();
    }

    open(employee:Employee = new Employee()) {
        const modalRef = this.modalService.open(EmployeeModalComponent);
        modalRef.componentInstance.updateEmployeeList.subscribe(() => {
            this.fetchEmployeeList().then(() => {
                modalRef.close();
            });
        });
        modalRef.componentInstance.employee = employee;
    }

    delete(id: number) {
        this.employerService.delete(id).pipe(first()).subscribe(() => {
            this.fetchEmployeeList();
        });
    }
}