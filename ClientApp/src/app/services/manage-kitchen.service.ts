import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders, HTTP_INTERCEPTORS } from "@angular/common/http";
import { Observable, of } from "rxjs";
import { flatMap, first, shareReplay } from 'rxjs/operators';
import { Item } from '../interfaces/Order_Item/item';
import { Orders } from '../interfaces/Order_Item/Orders';

@Injectable({
  providedIn: 'root'
})
export class ManageKitchenService {
  private baseURL: string;
  private itemOrderGetURL: string = "api/orders/getOrdersForAdmin";
  private items$: Observable<Item[]>;
  constructor(private http: HttpClient, @Inject('BASE_URL') BASE_URL: string) { this.baseURL = BASE_URL; }
  getItemsWithOrders(): Observable<Item[]>{
    if (!this.items$) {
      return this.http.get<Item[]>(this.baseURL + this.itemOrderGetURL).pipe(shareReplay());
    }
    return this.items$;
  }

  putOrder(order: Orders) {
    return this.http.put(this.baseURL + "api/orders", order);
  }
}
