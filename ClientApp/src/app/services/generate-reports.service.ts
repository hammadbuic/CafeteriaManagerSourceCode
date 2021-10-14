import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HTTP_INTERCEPTORS } from "@angular/common/http";
import { Observable, of } from "rxjs";
import { flatMap, first, shareReplay } from 'rxjs/operators';
import { Item } from '../interfaces/Order_Item/item-placeholder';
import { Orders } from '../interfaces/Order_Item/Orders';
@Injectable({
  providedIn: 'root'
})
export class GenerateReportsService {
  private baseURL: string;
  private itemOrderGetURL: string = "api/orders/getOrdersForAdmin";
  private items$: Observable<Item[]>;
  constructor(private http: HttpClient, @Inject('BASE_URL') BASE_URL: string) { this.baseURL = BASE_URL; }
  getItemsForReports(): Observable<Item[]> {
    if (!this.items$) {
      return this.http.get<Item[]>(this.baseURL + this.itemOrderGetURL).pipe(shareReplay());
    }
    return this.items$;
  }
}
