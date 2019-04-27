import { Routes, RouterModule } from '@angular/router';

import {
    HomeComponent,
    LoginComponent,
    RegisterComponent
} from './components';

import { AuthGuard } from './core/guards';
import { NonAuthGuard } from './core/guards';

const appRoutes: Routes = [
    { path: '', component: HomeComponent, canActivate: [ AuthGuard ] },
    { path: 'login', component: LoginComponent, canActivate: [ NonAuthGuard ] },
    { path: 'register', component: RegisterComponent, canActivate: [ NonAuthGuard ] },
    { path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(appRoutes);