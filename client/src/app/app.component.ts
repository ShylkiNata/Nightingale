import { Component, OnInit } from '@angular/core';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { Router, NavigationEnd } from "@angular/router";
import {AuthenticationService} from "./_services";

@Component({
    selector: 'app',
    templateUrl: 'app.component.html'
})

export class AppComponent {
    faSignOutAlt = faSignOutAlt;
    isAuthorized: boolean = false;
    activeRoute: String = null;

    constructor(private router: Router,
                private authService: AuthenticationService) {
        this.registerRouteListener();
        this.subscribeToAuthEvents();
    }

    logout() {
        this.isAuthorized = false;
        this.authService.logout()
            .then(() => {
                this.navigateTo('/login');
            });
    }

    navigateTo(route: String) {
        this.router.navigate([route]);
    }

    registerRouteListener(){
        this.router.events.subscribe(e => {
            if(e instanceof NavigationEnd){
                this.activeRoute = e.url;
            }
        });
    }
    subscribeToAuthEvents() {
        this.authService.userEntity.subscribe(data => this.isAuthorized = Boolean(data));
    }
}