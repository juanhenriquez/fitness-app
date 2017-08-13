import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

// store
import { Store } from 'store';

import { MealsService, Meal } from './../../../shared/services/meals/meals.service';

@Component({
  selector: 'meals',
  styleUrls: ['./meals.component.scss'],
  template: `
    <h1>Meals</h1>
    <p>{{ meals$ | async | json }}</p>
  `
})

export class MealsComponent implements OnInit, OnDestroy {

  meals$: Observable<Meal[]>;
  subscription: Subscription;

  ngOnInit() {
    this.meals$ = this.store.select<Meal[]>('meals');
    this.subscription = this.mealsService.meals$.subscribe();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  constructor(
    private mealsService: MealsService,
    private store: Store
  ) { }
}
