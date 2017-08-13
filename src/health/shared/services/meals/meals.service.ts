import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';

// store
import { Store } from 'store';

// services
import { AuthService } from './../../../../auth/shared/services/auth/auth.service';

export interface Meal {
  name: string,
  ingredients: string[],
  timestamp: number,
  $key: string,
  $exist: () => boolean
}

@Injectable()
export class MealsService {

  meals$: Observable<Meal[]> = this.db.list(`meals/${this.uid}`)
    .do(next => this.store.set('meals', next));

  get uid() {
    return this.authService.user.uid;
  }

  constructor(
    private db: AngularFireDatabase,
    private store: Store,
    private authService: AuthService
  ) {}

}
