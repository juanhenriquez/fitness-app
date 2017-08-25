import { Component, Input, Output, ChangeDetectionStrategy, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, FormArray, FormGroup, FormControl, Validators } from '@angular/forms';

import { Meal } from './../../../shared/services/meals/meals.service';

@Component({
  selector: 'meal-form',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./meal-form.component.scss'],
  template: `
    <div class="meal-form">
      <form [formGroup]="form">

        <div class="meal-form__name">
          <label for="">
            <h3>Meal name</h3>
            <input
              type="text"
              placeholder="e.g English Breakfast"
              formControlName="name">
            <div class="error" *ngIf="required">
              Workout name is required
            </div>
          </label>
        </div>

        <div class="meal-form__food">
          <div class="meal-form__subtitle">
            <h3>Food</h3>
            <button
              type="button"
              class="meal-form__add"
              (click)="addIngredient()">
              <img src="/img/add-white.svg" />
              Add food
            </button>
          </div>
          <div formArrayName="ingredients">
            <label *ngFor="let c of ingredients.controls; index as i">
              <input type="text" [formControlName]="i" placeholder="e.g Eggs">
              <span
                class="meal-form__remove"
                (click)="removeIngredient(i)">
              </span>
            </label>
          </div>
        </div>

        <div class="meal-form__submit">
          <div>
            <button
              *ngIf="!exist"
              type="button"
              class="button"
              (click)="createMeal()">
              Create meal
            </button>
            <button
              *ngIf="exist"
              type="button"
              class="button"
              (click)="updateMeal()">
              Save
            </button>
            <a
              class="button button--cancel"
              [routerLink]="['../']">
              Cancel
            </a>
          </div>

          <div class="meal-form__delete" *ngIf="exist">
            <div *ngIf="toggled">
              <p>Delete item?</p>
              <button
                type="button"
                class="confirm"
                (click)="removeMeal()">
                Yes
              </button>
              <button
                type="button"
                class="cancel"
                (click)="toggle()">
                No
              </button>
            </div>

            <button type="button" class="button button--delete" (click)="toggle()">
              Delete
            </button>
          </div>

        </div>

      </form>
    </div>
  `
})
export class MealFormComponent implements OnChanges {

  toggled = false;
  exist = false;

  form = this.fb.group({
    name: ['', Validators.required],
    ingredients: this.fb.array([''])
  });

  @Input() meal: Meal;

  @Output() create: EventEmitter<Meal> = new EventEmitter<Meal>();
  @Output() update: EventEmitter<Meal> = new EventEmitter<Meal>();
  @Output() remove: EventEmitter<Meal> = new EventEmitter<Meal>();

  constructor(
    private fb: FormBuilder
  ) {}

  ngOnChanges(changes: SimpleChanges) {
    if (this.meal && this.meal.name) {
      this.exist = true;
      this.emptyIngredients();

      const value = this.meal;
      this.form.patchValue(value);

      if (value.ingredients) {
        for (const item of value.ingredients) {
          this.ingredients.push(new FormControl(item));
        }
      }
    }
  }

  get ingredients() {
    return this.form.get('ingredients') as FormArray;
  }

  get required() {
    return (
      this.form.get('name').hasError('required') &&
      this.form.get('name').touched
    );
  }

  emptyIngredients() {
    while (this.ingredients.controls.length) {
      this.ingredients.removeAt(0);
    }
  }

  createMeal() {
    if (this.form.valid) {
      this.create.emit(this.form.value);
    }
  }

  updateMeal() {
    if (this.form.valid) {
      this.update.emit(this.form.value);
    }
  }

  removeMeal() {
    this.remove.emit(this.form.value);
  }

  addIngredient() {
    this.ingredients.push(new FormControl(''));
  }

  removeIngredient(index: number) {
    this.ingredients.removeAt(index);
  }

  toggle() {
    this.toggled = !this.toggled;
  }

}
