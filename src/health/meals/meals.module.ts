import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

// modules
import { SharedModule } from './../shared/shared.module';

// containers
import { MealsComponent } from './containers/meals/meals.component';

// components

export const ROUTES: Routes = [
  { path: '', component: MealsComponent }
];

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedModule,
    RouterModule.forChild(ROUTES)
  ],
  declarations: [
    MealsComponent
  ]
})
export class MealsModule {}
