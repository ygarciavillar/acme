import { Injectable, inject } from '@angular/core';
import { ActivatedRouteSnapshot, Router, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductDetailGuard implements CanActivate {
  private router = inject(Router);
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      const productId = Number(route.paramMap.get('id'));
      if(isNaN(productId) || productId < 1){
        alert("Invalid product id");
        this.router.navigate(['/products']);
        return false;
      } 
    return true;
  }
  
}
