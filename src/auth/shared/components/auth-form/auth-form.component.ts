import { Component, Output, EventEmitter } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'auth-form',
  styleUrls: ['./auth-form.component.scss'],
  template: `
    <div class="auth-form">
      <form [formGroup]="form" (ngSubmit)="onSubmit()">

        <ng-content select="h1"></ng-content>

        <label>
          <input
            type="email"
            placeholder="Email address"
            formControlName="email" />
        </label>

        <label>
          <input
            type="password"
            placeholder="Enter password"
            formControlName="password" />
        </label>

        <div class="error" *ngIf="isFieldValid('email', 'email')">
          Invalid email format
        </div>

        <div class="error" *ngIf="isFieldValid('password', 'required')">
          Password is required
        </div>

        <ng-content select=".error"></ng-content>

        <div class="auth-form__action">
          <ng-content select="button"></ng-content>
        </div>

        <div class="auth-form__toggle">
          <ng-content select="a"></ng-content>
        </div>

      </form>
    </div>
  `
})
export class AuthFormComponent {

  @Output()
  submitted: EventEmitter<FormGroup> = new EventEmitter<FormGroup>();

  form = this.fb.group({
    email: ['', Validators.email],
    password: ['', Validators.required]
  });

  onSubmit() {
    if (this.form.valid) {
      this.submitted.emit(this.form);
    }
  }

  isFieldValid(field: string, validation: string) {
    const control = this.form.get(field);
    return control.hasError(validation) && control.touched;
  }

  get invalidPassword() {
    const control = this.form.get('password');
    return control.hasError('required') && control.touched;
  }

  get emailFormat() {
    const control = this.form.get('email');
    return control.hasError('email') && control.touched;
  }

  constructor(
    private fb: FormBuilder
  ) { }
}
