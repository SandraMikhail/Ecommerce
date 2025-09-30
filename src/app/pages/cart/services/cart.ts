import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable, signal, Signal, WritableSignal } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class Cart {
  private token:string =""
  private readonly http = inject(HttpClient)


getHeaders() {
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : '';
  return {
    headers: new HttpHeaders({
      'token': token || ''
    })
  };
}

  countNumber:WritableSignal<number> = signal(0)

  addProductToCart(id:string):Observable<any>{
    return this.http.post(environment.baseUrl + `/cart`,
      {"productId": id},
    )
  }

  getLoggedUserCart():Observable<any>{
        return this.http.get(environment.baseUrl+'/cart'
        )
    }

    removeSpecificCardItem(id:string):Observable<any>{
      return this.http.delete(environment.baseUrl + `/cart/${id}`)
    }

    updateCartCount(id:string, count:number):Observable<any>{
      return this.http.put(environment.baseUrl +`/cart/${id}`, {count:count})
    }

    checkoutSession(id:string,data:object):Observable<any>{
      return this.http.post(environment.baseUrl +`/orders/checkout-session/${id}?url=http://localhost:4200`, data , this.getHeaders() )
    }
    checkoutCash(id:string,data:object):Observable<any>{
      return this.http.post(environment.baseUrl+`/orders/${id}`,data, this.getHeaders() )
    }

    getUserOrders(cartOwner:string):Observable<any>{
      return this.http.get(environment.baseUrl+ `/orders/user/${cartOwner}`,this.getHeaders())

    }

}
