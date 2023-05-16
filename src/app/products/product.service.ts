import { Injectable, inject } from "@angular/core";
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http"
import { IProduct } from "./product.interface";
import { Observable, catchError, tap, throwError, map, of } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class ProductService{
  private url = 'http://localhost:3000/products'
  private http = inject(HttpClient);

  getProducts() : Observable<IProduct[]> {
     return this.http.get<IProduct[]>(this.url).pipe(
      tap(data => console.log("All data: ", JSON.stringify(data))),
      catchError(this.handleError)
     );
  }

  getProduct(id: number): Observable<IProduct>{
    if(id === 0) {
      return of(this.initializeProduct())
    }
    return this.http.get<IProduct>(`${this.url}/${id}`).pipe(
      catchError(this.handleError)
    )
  }

  createProduct(product: IProduct) {
    const header = new HttpHeaders({'Content-Type': 'application/json'})
    const {id, ...newProd} = product;
    console.log("saving product", product, "with url", this.url)
    return this.http.post<IProduct>(this.url, newProd, {headers: header}).pipe(
      catchError(this.handleError)
    );
  }

  updateProduct(product: IProduct){
    const header = new HttpHeaders({'Content-Type': 'application/json'})
    const url = `${this.url}/${product.id}`;
    return this.http.put<IProduct>(url, product, {headers: header}).pipe(
      catchError(this.handleError)
    );
  }

  deleteProduct(id: number) : Observable<{}> {
    const header = new HttpHeaders({'Content-Type': 'application/json'})
    const url = `${this.url}/${id}`;
    return this.http.delete<{}>(url, {headers: header}).pipe(
      catchError(this.handleError)
    )
  }

  private handleError(err: HttpErrorResponse){
     let errorMessage = ''

     if(err.error instanceof ErrorEvent){
      errorMessage = `An error ocurred ${err.error.message}`;
     }else{
      errorMessage = `Server return code: ${err.status}, error message is: ${err.message}`;
     }
     return throwError( () => errorMessage);
  }

  private initializeProduct(): IProduct {

    return {
      id: 0 ,
      name: null,
      code: null,
      releaseDate: null,
      description: null,
      price: null,
      rating: null,
      imageUrl: null,
      tags: []
    }
  }
  
}