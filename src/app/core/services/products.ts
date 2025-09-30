import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class Products {
  constructor(private http:HttpClient){}

    getProducts(pageNumber:number= 1):Observable<any>{
    return this.http.get(environment.baseUrl + `/products?page=${pageNumber}`)
  }

  getSpecificProduct(id:string):Observable<any>{
    return this.http.get(environment.baseUrl + `/products/${id}`)


  }
}
