import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

import { Employee, User, Table } from '../_models';
import { EmployeeDataService, EmployeeTransitService } from '../_services';
import { EmployeeModalComponent } from '../employee-modal';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormControl } from "@angular/forms";

@Component({
    templateUrl: 'home.component.html'
})

export class HomeComponent implements OnInit {
    authorized: User;
    employees: Employee[] = [];
    table:Table = new Table();
    filter = new FormControl('');

    constructor(private employerTransitService: EmployeeTransitService,
                private employerDataService: EmployeeDataService,
                private modalService: NgbModal) {

        this.filter.valueChanges.pipe().subscribe(text => {
            this.table.page = 1;
            this.table.search = text;
            this.fetchEmployeeList();
        });
        this.employerDataService.employeeList.subscribe(list => this.employees = list);
        this.authorized = JSON.parse(localStorage.getItem('currentUser'));
    }

    ngOnInit() {
        this.fetchEmployeeList();
    }

    /*deleteUser(id: number) {
        this.userService.delete(id).pipe(first()).subscribe(() => { 
            this.loadAllUsers() 
        });
    }*/

    private async fetchEmployeeList() {
        this.employerTransitService.search(this.table).pipe(first()).subscribe(data => {
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
console.log(id);
    }
}