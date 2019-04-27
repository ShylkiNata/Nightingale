import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { Employee } from '../_models';

@Injectable()
export class UserDataService {

    private employees = new BehaviorSubject([]);
    employeeList = this.employees.asObservable();

    constructor() { }

    setUser(employees: Employee[]) {
        this.employees.next(employees)
    }
    addToEmployeeList(item: Employee) {
        /*let list = this.employees;
        list.push(item);

        this.setEmployeeList(list);*/
    }
}