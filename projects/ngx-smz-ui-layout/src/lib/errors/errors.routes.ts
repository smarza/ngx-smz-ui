import { Routes } from '@angular/router';
import { AccessPageComponent } from './access';
import { ErrorPageComponent } from './error';
import { NotfoundPageComponent } from './notfound';

export const ErrorsRoutes = [
    { path: 'access', component: AccessPageComponent },
    { path: 'error', component: ErrorPageComponent },
    { path: 'notfound', component: NotfoundPageComponent }
] as Routes;
