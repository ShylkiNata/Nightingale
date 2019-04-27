import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgbModule, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { routing } from './app.routing';

import {
    JwtInterceptor,
    ErrorInterceptor
} from './core/helpers';

import {
    AlertService,
    AuthenticationService,
    EmployeeService,
    PositionService
} from './core/services';

import {
    AuthGuard,
    NonAuthGuard
} from "./core/guards";

import {
    AppComponent,

    HomeComponent,
    LoginComponent,
    RegisterComponent,

    AlertComponent,
    EmployeeModalComponent
} from './components';


@NgModule({
    imports: [
        BrowserModule,
        ReactiveFormsModule,
        HttpClientModule,
        NgbModule.forRoot(),
        routing,
        FormsModule,
        FontAwesomeModule
    ],
    declarations: [
        AppComponent,
        AlertComponent,
        EmployeeModalComponent,
        HomeComponent,
        LoginComponent,
        RegisterComponent
    ],
    providers: [
        AuthGuard,
        NonAuthGuard,
        AlertService,
        AuthenticationService,
        EmployeeService,
        PositionService,
        NgbActiveModal,
        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    ],
    entryComponents: [
        EmployeeModalComponent
    ],
    bootstrap: [ AppComponent ]
})

export class AppModule {}

// styles
import '@/assets/scss/styles.scss';