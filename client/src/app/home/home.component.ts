import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

import { Employee } from '../_models';
import { EmployeeService } from '../_services';

@Component({
    templateUrl: 'home.component.html'
})

export class HomeComponent implements OnInit {
    employees: Employee[] = [];

    constructor(private employerService: EmployeeService) {

    }

    ngOnInit() {
        this.fetchEmployeeList();
    }

    /*deleteUser(id: number) {
        this.userService.delete(id).pipe(first()).subscribe(() => { 
            this.loadAllUsers() 
        });
    }*/

    private fetchEmployeeList() {
        this.employerService.read().pipe(first()).subscribe(employees => {
            this.employees = employees;
        });
    }
}