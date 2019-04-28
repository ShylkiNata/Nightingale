import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { faAngleDoubleRight } from '@fortawesome/free-solid-svg-icons';

import { AlertService, AuthenticationService } from '../../../core/services';

@Component({templateUrl: 'register.component.html'})
export class RegisterComponent implements OnInit {
    faAngleDoubleRight = faAngleDoubleRight;
    registerForm: FormGroup;
    loading = false;
    submitted = false;

    constructor(
        private authService: AuthenticationService,
        private formBuilder: FormBuilder,
        private router: Router,
        private alertService: AlertService) { }

    ngOnInit() {
        this.registerForm = this.formBuilder.group({
            login: ['', Validators.required],
            email: ['', Validators.required],
            password: ['', [Validators.required, Validators.minLength(6)]]
        });
    }

    get f() { return this.registerForm.controls; }

    onSubmit() {
        this.submitted = true;

        if (this.registerForm.invalid) {
            return;
        }

        this.loading = true;

        this.authService.register(this.registerForm.value)
            .subscribe(
                data => {
                    this.loading = false;
                    this.router.navigate(['/home']);
                },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
                });
    }
}
