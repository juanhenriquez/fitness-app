
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// modules
import { SharedModule } from './shared/shared.module';

// guards
import { AuthGuard } from './../auth/shared/guards/auth.guards';

export const ROUTES: Routes = [
  { path: 'meals', canActivate: [AuthGuard], loadChildren: './meals/meals.module#MealsModule' },
  { path: 'schedule', canActivate: [AuthGuard], loadChildren: './schedule/schedule.module#ScheduleModule' },
  { path: 'workouts', canActivate: [AuthGuard], loadChildren: './workouts/workouts.module#WorkoutsModule' }
];

@NgModule({
  imports: [
    RouterModule.forChild(ROUTES),
    SharedModule.forRoot()
  ],
})
export class HealthModule {}
