import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home';
import { LoginComponent } from './login';
import { RegisterComponent } from './register';

import { AuthGuard } from './_guards';
import { NonAuthGuard } from './_guards';

const appRoutes: Routes = [
    { path: '', component: HomeComponent, canActivate: [ AuthGuard ] },
    { path: 'login', component: LoginComponent, canActivate: [ NonAuthGuard ] },
    { path: 'register', component: RegisterComponent, canActivate: [ NonAuthGuard ] },
    { path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(appRoutes);