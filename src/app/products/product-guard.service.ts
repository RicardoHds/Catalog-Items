import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';

@Injectable()
export class ProductGuardService implements CanActivate {

  constructor(private _router: Router) { }

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const id = +route.params.id;
    // const id = +route.url[1].path;
    if (isNaN(id) || id < 1) {
      alert('Invalid product Id');
      this._router.navigate(['/product']);
      return false;
    }
    return true;
  }
}
