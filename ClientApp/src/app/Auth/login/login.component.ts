import { Component, OnInit, Renderer2 } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { UserAuthService } from '../../services/user-auth.service';
import { CookieService } from 'ngx-cookie-service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  formModel = {
    Username: '',
    Password: ''
  }
  constructor(private spinner: NgxSpinnerService, private cookieService: CookieService, private renderer: Renderer2, private router: Router, private toastr: ToastrService, private service: UserAuthService
  ) { }

  ngOnInit(): void {
    this.renderer.addClass(document.querySelector('app-root'), 'login-page');
    if (localStorage.getItem('token') != null) {
      this.router.navigateByUrl('/home')
    }
  }
  onSubmit(form: NgForm) {
    this.spinner.show('route-loader-spinner');
    this.service.login(form.value).subscribe(
      (res: any) => {
        this.spinner.hide('route-loader-spinner');
        localStorage.setItem('token', res.token);
        this.service.getProfile().subscribe(result => {
          this.cookieService.set('User-Info', JSON.stringify(result));
          console.log(this.cookieService.get('User-Info'));
        },
         error => { console.log("UNABLE TO RETERIVE USER INFO.")}        )
        this.router.navigateByUrl('/home');
        this.toastr.success('Logged In Successfully', 'Login Success');
      },
      err => {
        if (err.status == 400) {
          this.spinner.hide('route-loader-spinner');
          this.toastr.error('Incorrect Username or Password or confirm email', 'Authentication failed');
        } else {
          this.spinner.hide('route-loader-spinner');
          this.toastr.error('Login not allowed!', 'Authentication failed');
          console.log(err);
        }
      });
  }
  redirect() {
    this.router.navigateByUrl('/auth/forgotPassword');
  }
  ngOnDestroy() {
    this.renderer.removeClass(document.querySelector('app-root'), 'login-page');
  }
}
