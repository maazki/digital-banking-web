import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';

export const authenticationGuard: CanActivateFn = (route, state) => {

  const appState = inject(AuthService);
  const router = inject(Router);
  if (appState.isAuthenticated) {
    return true;
  } else {
    router.navigateByUrl('/login');
    return false;
  }

};
