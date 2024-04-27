import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { StoreDataService } from './storedata.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private storeData: StoreDataService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot
  ):
  | Observable<boolean | UrlTree>
  | boolean
  | UrlTree {
    let requiredStep : 'step1' | 'step2' | 'step3' = route.url[0].path  as 'step1' | 'step2' | 'step3';
    if (requiredStep === 'step2') {
      requiredStep = 'step1';
    } else if (requiredStep === 'step3') {
      requiredStep = 'step2';
    }
    return this.storeData.getData(requiredStep).pipe(
      map((response: any) => {
        if (response === undefined){
          if (requiredStep === 'step2') {
            this.router.navigate([requiredStep]);
          } else {
            this.router.navigate(['/']);
          }
          return false;
        }
        return true;
      })
    );
  }
}
