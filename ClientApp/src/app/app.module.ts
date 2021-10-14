import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { PreloadAllModules, PreloadingStrategy, RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { LoginComponent } from './Auth/login/login.component';
import { HomeComponent } from './home/home.component';
import { compileClassMetadata } from '@angular/compiler';
import { NgxSpinnerModule } from "ngx-spinner";
import { ToastrModule } from 'ngx-toastr';
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DataTablesModule } from 'angular-datatables';
import { ModalModule } from 'ngx-bootstrap/modal';
import { SelectDropDownModule } from 'ngx-select-dropdown';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { CookieService } from 'ngx-cookie-service';
import { AuthInterceptor } from './Utilities/auth.interceptor';
import { UserAuthService } from './services/user-auth.service';
import { FooterComponent } from './home/footer/footer.component';
import { HeaderComponent } from './home/header/header.component';
import { SideNavMenuComponent } from './home/side-nav-menu/side-nav-menu.component';
import { UserDropdownMenuComponent } from './home/header/user-dropdown-menu/user-dropdown-menu.component';
import { AuthGuard } from './Utilities/auth.guard';
import { ProfileComponent } from './Views/Common/profile/profile.component';
import { EmailConfirmationComponent } from './Auth/email-confirmation/email-confirmation.component';
import { ForgotPasswordComponent } from './Auth/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './Auth/reset-password/reset-password.component';

const routes: Routes = [
  { path: '', redirectTo: '/auth/login', pathMatch: 'full' },
  { path: 'auth/login', component: LoginComponent },
  { path: 'Account/ConfirmEmail', component: EmailConfirmationComponent },
  { path: 'auth/forgotPassword', component: ForgotPasswordComponent },
  { path: 'auth/resetPassword', component: ResetPasswordComponent },
  {
    path: 'home', component: HomeComponent, canActivate: [AuthGuard],
    children: [
      { path: 'admin', loadChildren: () => import('./Views/admin/admin.module').then(m => m.AdminModule) }
    ]
  }
  ]

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    FooterComponent,
    HeaderComponent,
    SideNavMenuComponent,
    UserDropdownMenuComponent,
    ProfileComponent,
    EmailConfirmationComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({ progressBar: true }),
    FormsModule,
    NgbModule,
    DataTablesModule,
    SelectDropDownModule,
    ModalModule.forRoot(),
    BsDatepickerModule.forRoot(),
    NgxSpinnerModule,
    NgxSpinnerModule,
    RouterModule.forRoot(routes)
  ],
  providers: [CookieService,
              { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
                UserAuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
