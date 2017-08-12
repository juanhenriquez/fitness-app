import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

// services
import { AuthService } from './../../../shared/services/auth/auth.service';

@Component({
  selector: 'register',
  template: `
    <div>
      <auth-form (submitted)="registerUser($event)">
        <h1>Register</h1>
        <button type="submit">Create account</button>
        <a routerLink="/auth/login">Already have an account?</a>
        <div class="error" *ngIf="error">{{ error }}</div>
      </auth-form>
    </div>
  `
})
export class RegisterComponent {

  error: string;

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  async registerUser(event: FormGroup) {
    const { email, password } = event.value;
    try {
      await this.authService.createUser(email, password);
      this.router.navigate(['/']);
    } catch (e) {
      this.error = e.message;
    }
  }
}
