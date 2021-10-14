import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationStart, NavigationCancel, Router, NavigationEnd, NavigationError } from '@angular/router';
import { Admin } from '../../../interfaces/admin';
import { Profile } from '../../../interfaces/profile';
import { AdminManageService } from '../../../services/admin-manage.service';
import { UserAuthService } from '../../../services/user-auth.service';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit, OnDestroy {
  srcImg: string;
  @Input() admin!: Admin;
  @Input() user!: any;
  constructor(private route: ActivatedRoute,
    private router: Router, private service: AdminManageService, private profileService: UserAuthService) {}

  ngOnInit(): void {
    let id = this.route.snapshot.params['id'];
    if (this.service.getAdminById(id) != null) {
      this.service.getAdminById(id).subscribe(result => {
        this.admin = result;
      })
    }
    if (this.profileService.getProfile() != null) {
      this.profileService.getProfile().subscribe(result => {
        this.user = result;
        this.srcImg = 'https://avatars.dicebear.com/api/avataaars/' + this.user.fullname + '.svg'

      })
    }
  }
  onClick() { this.router.navigateByUrl("/home/admin"); }
  ngOnDestroy() { this.user = null; this.admin = this.user; }
}
