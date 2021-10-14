import { Injectable,Inject } from '@angular/core';
import { HttpClient, HttpHeaders, HTTP_INTERCEPTORS } from "@angular/common/http";
import { Observable, of } from "rxjs";
import { flatMap, first, shareReplay } from 'rxjs/operators';
import { Item } from '../interfaces/item';
@Injectable({
  providedIn: 'root'
})
export class ItemManageService {
  private baseURL: string;
  private itemCrudURL:string="api/item/"
  private items$: Observable<Item[]>;
  constructor(private http: HttpClient, @Inject('BASE_URL') BASE_URL: string) { this.baseURL = BASE_URL; }
  getItemList(): Observable<Item[]> {
    if (!this.items$) {
      return this.http.get<Item[]>(this.baseURL + this.itemCrudURL).pipe(shareReplay());
    }
    return this.items$;
  }
  postItem(itemData: any) {
    return this.http.post(this.baseURL + this.itemCrudURL, itemData);
  }
  deleteItem(itemId: Number, Filename: string) {
    return this.http.delete(this.baseURL + this.itemCrudURL + itemId + '/' + Filename);
  }
  clearItemCache() {
    this.items$ = null;
  }
}
