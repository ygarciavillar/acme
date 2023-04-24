import { Injectable } from "@angular/core";
import {HttpClient, HttpErrorResponse} from "@angular/common/http"
import { IProduct } from "./product.interface";
import { Observable, catchError, tap, throwError, map } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class ProductService{
  private url = 'api/products/products.json'

  constructor(private http: HttpClient){}

  getProducts() : Observable<IProduct[]> {
     return this.http.get<IProduct[]>(this.url).pipe(
      tap(data => console.log("All data: ", JSON.stringify(data))),
      catchError(this.handleError)
     );
  }

  getProduct(id: number): Observable<IProduct | undefined>{
    return this.getProducts().pipe(
      map(products => products.find(product => product.id === id))
    )
  }

  private handleError(err: HttpErrorResponse){
     let errorMessage = ''

     if(err.error instanceof ErrorEvent){
      errorMessage = `An error ocurred ${err.error.message}`;
     }else{
      errorMessage = `Server return code: ${err.status}, error message is: ${err.message}`;
     }
     console.log(errorMessage);
     return throwError( () => errorMessage);
  }

  
}