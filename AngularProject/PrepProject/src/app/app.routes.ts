import { Routes } from '@angular/router';
import { LoginComponent } from './login-component/login-component';
import { Home } from './home/home';

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
  { path: 'home', component: Home },
  { path: '', redirectTo: '/login', pathMatch: 'full' } 
];
