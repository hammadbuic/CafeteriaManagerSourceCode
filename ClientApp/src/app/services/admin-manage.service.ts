import { Injectable,Inject } from '@angular/core';
import { HttpClient, HttpHeaders, HTTP_INTERCEPTORS } from "@angular/common/http";
import { Observable, of } from "rxjs";
import { Admin } from '../interfaces/admin';
import { flatMap, first, shareReplay } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class AdminManageService {
  private baseURL: string;
  private adminCRUDURL: string = "api/admin/";
  private admins$!: Observable<Admin[]>;
  constructor(private http: HttpClient, @Inject('BASE_URL') BASE_URL: string) { this.baseURL = BASE_URL }
  getAdminList(): Observable<Admin[]> {
    console.log(this.baseURL);
    if (!this.admins$) {
      return this.http.get<Admin[]>(this.baseURL + this.adminCRUDURL+"getAdmins").pipe(shareReplay());
    }
    return this.admins$;
  }
  //get Admin by id
  getAdminById(id: string): Observable<Admin> {
    return this.getAdminList().pipe(flatMap(result => result), first(admin => admin.id == id));
  }
  postAdmin(admin: Admin): Observable<Admin> {
    return this.http.post<Admin>(this.baseURL + this.adminCRUDURL, admin);
  }
  deleteAdmin(id: string) {
    return this.http.delete(this.baseURL + this.adminCRUDURL + id);
  }
  clearServiceCache() {
    this.admins$ = of([]);
  }
}
