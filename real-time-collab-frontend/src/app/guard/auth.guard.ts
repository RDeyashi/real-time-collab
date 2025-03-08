import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router)
  const accessToken = localStorage.getItem('access-token')
  if (accessToken)
    return true;
  else{
    router.navigate(['/signin'])
    return false
  }
};
