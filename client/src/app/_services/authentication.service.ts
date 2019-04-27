import {Injectable, OnInit} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import {BehaviorSubject} from "rxjs";
import {Employee, User} from "../_models";

@Injectable()
export class AuthenticationService implements OnInit {
    private user = new BehaviorSubject(null);
    userEntity = this.user.asObservable();

    constructor(private http: HttpClient) {
        /*let data = localStorage.getItem('currentUser');
        this.setUser(data);*/
    }

    ngOnInit() {

    }

    login(email: string, password: string) {
        return this.http.post<any>(`${config.apiUrl}/users/authenticate`, { email: email, password: password })
            .pipe(map(user => {
                if (user && user.token) {
                    this.setUser(user)
                }

                return user;
            }));
    }

    async logout() {
        await localStorage.removeItem('currentUser');
    }

    setUser(data: String) {
        this.user.next(data);
        localStorage.setItem('currentUser', JSON.stringify(data));
    }
}