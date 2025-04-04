import { ChangeDetectorRef, inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  GuardResult,
  MaybeAsync,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import moment from 'moment';

export const canActiveLogin: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
): MaybeAsync<GuardResult> => {
  const router = inject(Router);

  if (isLogged()) {
    router.navigate(['/dashboard']);
    return false;
  }
  return true;
};

export const canActivateGeneral: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
): MaybeAsync<GuardResult> => {
  const router = inject(Router);

  if (!isLogged()) {
    router.navigate(['/authentication']);
    return false;
  }
  if (state.url === '/') {
    router.navigate(['/dashboard']);
  }
  return true;
};

function getToken(): string | null {
  return localStorage.getItem('token');
}

export function isLogged(): boolean {
  try {
    const token = getToken();
    if (!token) {
      return false;
    }
    const decoded = jwtDecode(token);

    if (!decoded.exp) {
      return false;
    }

    const currentTime = moment(Date.now()).toDate();

    return moment(moment.unix(decoded.exp).format()).toDate() > currentTime;
  } catch (error) {
    return false;
  }
}
