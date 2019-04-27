import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class PositionService {

    constructor(private http: HttpClient) { }

    read() {
        return this.http.get<Array<Object>>(`${config.apiUrl}/positions`);
    }
}