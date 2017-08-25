import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';

// store
import { Store } from 'store';

// services
import { AuthService } from './../../../../auth/shared/services/auth/auth.service';

export interface Workout {
  name: string,
  type: string,
  strength: any,
  endurance: any,
  timestamp: number,
  $key: string,
  $exist: () => boolean
}

@Injectable()
export class WorkoutsService {

  workouts$: Observable<Workout[]> = this.db.list(`workouts/${this.uid}`)
    .do(next => this.store.set('workouts', next));

  constructor(
    private db: AngularFireDatabase,
    private store: Store,
    private authService: AuthService
  ) {}

  get uid() {
    return this.authService.user.uid;
  }

  getWorkout(key: string) {
    if(!key) return Observable.of({});
    return this.store.select<Workout[]>('workouts')
      .filter(Boolean)
      .map(workouts => workouts.find((workout: Workout) => workout.$key === key));
  }

  addWorkout(workout: Workout) {
    return this.db
      .list(`workouts/${this.uid}`)
      .push(workout);
  }

  updateWorkout(key: string, workout: Workout) {
    return this.db
      .object(`workouts/${this.uid}/${key}`)
      .update(workout);
  }

  removeWorkout(key: string) {
    return this.db
      .list(`workouts/${this.uid}`)
      .remove(key);
  }

}
