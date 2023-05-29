import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ProductsService } from '../admin/products/products.service';



@Injectable({
  providedIn: 'root'
})
export class LandingssResolver implements Resolve<boolean> {

  constructor(private _productsService: ProductsService){}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    return this._productsService.getAllProducts();
  }
}



@Injectable({
  providedIn: 'root'
})

export class LandingResolver implements Resolve<any>
{
    /**
     * Constructor
     */
    constructor(
        private _productsService: ProductsService,
        private _router: Router,
    ) {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Resolver
     *
     * @param route
     * @param state
     */
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
      
            return this._productsService.getProductById(route.paramMap.get('id'))
                .pipe(
                    // Error here means the requested individuo is not available
                    catchError((error) => {

                        // Log the error
                        console.error('Resolve ', error);

                        // Get the parent url
                        const parentUrl = state.url.split('/').slice(0, -1).join('/');

                        // Navigate to there
                        this._router.navigateByUrl(parentUrl);

                        // Throw an error
                        return throwError(error);
                    })
                );
        
    }
}


