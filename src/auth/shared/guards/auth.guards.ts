import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';

import 'rxjs/add/operator/map'

// services
import { AuthService } from './../services/auth/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {

  canActivate() {
    return this.authService.authState
      .map((user) => {
        if (!user) {
          this.router.navigate(['/auth/login']);
        }
        return !!user;
      });
  }

  constructor(
    private router: Router,
    private authService: AuthService
  ) {}
}
