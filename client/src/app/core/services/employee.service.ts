import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import {Employee, Table} from '../models';

@Injectable()
export class EmployeeService {

    constructor(private http: HttpClient) { }

    create(employee: Employee) {
        return this.http.post(`${config.apiUrl}/employees/create`, employee);
    }

    update(employee: Employee, id: number) {
        return this.http.put(`${config.apiUrl}/employees/` + id, employee);
    }

    delete(id: number) {
        return this.http.delete(`${config.apiUrl}/employees/` + id);
    }

    search(table: Table) {
        return this.http.post<any>(`${config.apiUrl}/employees/search`, table);
    }
}