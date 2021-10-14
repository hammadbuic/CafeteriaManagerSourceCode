import { Component, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserAuthService } from '../../services/user-auth.service';

@Component({
  selector: 'app-email-confirmation',
  templateUrl: './email-confirmation.component.html',
  styleUrls: ['./email-confirmation.component.scss']
})
export class EmailConfirmationComponent implements OnInit, OnDestroy {

  constructor(private toastr: ToastrService, private route: ActivatedRoute, private service: UserAuthService, private renderer: Renderer2, private router: Router) { }
  ngOnInit(): void {
    const token = this.route.snapshot.queryParams['token'];
    const email = this.route.snapshot.queryParams['email'];
    this.service.confirmEmail(token, email).subscribe(result => {
      console.log("Email Confirmed!");
      this.toastr.success("Email Confirmed!", "Please Login Now");  
      this.router.navigateByUrl('/auth/login');
      //console.log(result.status)
    }, error => {
      console.log("Email not confirmed");
    });
  }
  ngOnDestroy() {
  }
}
