import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Employee } from '../_models';

@Injectable()
export class EmployeeService {

    constructor(private http: HttpClient) { }

    create(employee: Employee) {
        return this.http.post(`${config.apiUrl}/employees/create`, employee);
    }

    read() {
        return this.http.get<Employee[]>(`${config.apiUrl}/employees`);
    }

    update(employee: Employee) {
        return this.http.put(`${config.apiUrl}/employees/` + employee.id, employee);
    }

    delete(id: number) {
        return this.http.delete(`${config.apiUrl}/employees/` + id);
    }
}