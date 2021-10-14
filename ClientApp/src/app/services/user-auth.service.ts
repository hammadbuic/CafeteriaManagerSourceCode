import { Injectable,Inject } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HTTP_INTERCEPTORS } from "@angular/common/http";
import { Observable } from "rxjs";
import { Login } from '../interfaces/login';
import { Profile } from '../interfaces/profile';
import { CookieService } from 'ngx-cookie-service';
import { CustomEncoder } from '../Auth/custom-encoder';
import { ForgotPassword } from '../interfaces/ForgotPassword';
import { PasswordRestDTO } from '../interfaces/PasswordRestDTO';
@Injectable({
  providedIn: 'root'
})
export class UserAuthService {
  baseURL: string;
  loginURL: string = 'api/auth/login';
  profileURL: string = 'api/auth';
  emailURL: string = 'api/admin/confirmemail';
  forgotPasswordURL: string = 'api/auth/forgotpassword';
  constructor(private http: HttpClient, private cookie: CookieService, @Inject('BASE_URL') BASE_URL: string) { this.baseURL = BASE_URL }
  login(loginData: Login) {
    console.log(this.baseURL);
    console.log(this.loginURL);
    return this.http.post<Login>(this.baseURL + this.loginURL, loginData);
  }
  getProfile() {
    return this.http.get(this.baseURL + this.profileURL);
  }
  confirmEmail(token: string, email: string) {
    let params = new HttpParams({ encoder: new CustomEncoder() });
    params = params.append('token', token);
    params = params.append('email', email);
    return this.http.get(this.baseURL + this.emailURL, { params: params });
  }
  forgotPassword(body: ForgotPassword) {
    return this.http.post(this.baseURL + this.forgotPasswordURL, body);
  }
  resetPassword(body: PasswordRestDTO) {
    return this.http.post(this.baseURL + "api/auth/resetpassword", body);
  }
  logout() {
    localStorage.removeItem('token');
    this.cookie.delete('User - Info');
  }
}
