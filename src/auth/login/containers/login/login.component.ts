import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from './../../../shared/services/auth/auth.service';

@Component({
  selector: 'login',
  template: `
    <div>
      <auth-form (submitted)="loginUser($event)">
        <h1>Login</h1>
        <button type="submit">Login</button>
        <a routerLink="/auth/register">Not registered?</a>
        <div class="error" *ngIf="error">{{ error }}</div>
      </auth-form>
    </div>
  `
})
export class LoginComponent {

  error: string;

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  async loginUser(event: FormGroup) {
    const { email, password } = event.value;
    try {
      await this.authService.loginUser(email, password);
      this.router.navigate(['/']);
    } catch (e) {
      this.error = e.message;
    }
  }
}
