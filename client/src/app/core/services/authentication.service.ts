import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { BehaviorSubject, Observable } from "rxjs";
import {User} from "../models";

@Injectable()
export class AuthenticationService {
    private user:BehaviorSubject<String>;
    userEntity:Observable<String>;

    constructor(private http: HttpClient) {
        let data = localStorage.getItem('currentUser');

        this.user = new BehaviorSubject(data);
        this.userEntity = this.user.asObservable();
    }

    login(email: string, password: string) {
        let query = this.http.post<any>(`${config.apiUrl}/users/authenticate`, { email: email, password: password });
        return this.handleResponse(query);
    }

    register(user: User) {
        let query = this.http.post<any>(`${config.apiUrl}/users/register`, user);
        return this.handleResponse(query);
    }

    async logout() {
        this.user.next(undefined);
        await localStorage.removeItem('currentUser');
    }

    setUser(data: String) {
        this.user.next(data);
        localStorage.setItem('currentUser', JSON.stringify(data));
    }

    handleResponse(query: Observable<any>) {
        return query.pipe(map(user => {
            if (user && user.token) {
                this.setUser(user)
            }
        }));
    }
}