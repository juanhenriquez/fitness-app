import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

// modules
import { SharedModule } from './../shared/shared.module';

// containers
import { LoginComponent } from './containers/login/login.component';

export const ROUTES: Routes = [
  { path: '', component: LoginComponent }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(ROUTES),
    SharedModule
  ],
  declarations: [
    LoginComponent
  ],
})
export class LoginModule { }
