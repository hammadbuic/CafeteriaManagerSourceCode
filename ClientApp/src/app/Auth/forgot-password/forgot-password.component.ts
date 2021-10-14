import { Component, OnDestroy, OnInit, Renderer2,Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ForgotPassword } from '../../interfaces/ForgotPassword';
import { UserAuthService } from '../../services/user-auth.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit, OnDestroy {
  public forgotPasswordForm: FormGroup
  public successMessage: string;
  public errorMessage: string;
  public showSuccess: boolean;
  public showError: boolean;
  private baseURL: string;
  constructor(@Inject('BASE_URL') BASE_URL: string, private router: Router, private service: UserAuthService, private renderer: Renderer2) { this.baseURL = BASE_URL }

  ngOnInit(): void {
    //this.renderer.removeClass(document.querySelector('app-root'), 'login-page');
    //this.renderer.addClass(document.querySelector('app-root'), 'forgot-page');
    this.forgotPasswordForm = new FormGroup({
      email: new FormControl("", [Validators.required])
    });
  }
  public validateControl = (controlName: string) => {
    return this.forgotPasswordForm.controls[controlName].invalid && this.forgotPasswordForm.controls[controlName].touched
  }
  public hasError = (controlName: string, errorName: string) => {
    return this.forgotPasswordForm.controls[controlName].hasError(errorName)
  }
  public forgotPassword(forgotPasswordFormValue) {
    this.showError = this.showSuccess = false;
    const forgotPass = { ...forgotPasswordFormValue };
    const forgotPasswordDTO: ForgotPassword = {
      email: forgotPass.email,
      clientURI: this.baseURL + 'auth/resetpassword'
    };
    console.log(forgotPasswordDTO);
    this.service.forgotPassword(forgotPasswordDTO).subscribe(result => {
      this.showSuccess = true;
      this.successMessage = "Password Reset Link sent! Please Check your Email";
    }, error => {
      this.showError = true;
      this.errorMessage = error;
    });
  }
  redirect() {
    this.router.navigateByUrl('/auth/login');
  }
  ngOnDestroy() {
    this.renderer.removeClass(document.querySelector('app-root'), 'forgot-page');
  }
}
