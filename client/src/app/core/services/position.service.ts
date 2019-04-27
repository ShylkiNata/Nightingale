import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class PositionService {

    private positions: Array<Object>;

    constructor(private http: HttpClient) { }

    get() {
        return this.positions;
    }

    read() {
        return this.http.get<Array<Object>>(`${config.apiUrl}/positions`)
            .subscribe(data => {
                this.positions = data;
            });
    }
}