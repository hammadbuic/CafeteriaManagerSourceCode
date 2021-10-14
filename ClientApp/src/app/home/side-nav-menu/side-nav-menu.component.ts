import { Component, OnInit, AfterViewInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { Profile } from '../../interfaces/profile';
import { UserAuthService } from '../../services/user-auth.service';
import { adminList, MenuItem} from "./menu-component";
@Component({
  selector: 'app-side-nav-menu',
  templateUrl: './side-nav-menu.component.html',
  styleUrls: ['./side-nav-menu.component.scss']
})
export class SideNavMenuComponent implements OnInit, AfterViewInit {
  srcImg: string;
  sideItems = adminList;
  info$!: Observable<any>;
  userInfo: any = null;
  role = "./admin/";
  @ViewChild('mainSidebar', { static: false }) mainSidebar:any;
  @Output() mainSidebarHeight: EventEmitter<any> = new EventEmitter<any>();
  constructor(private cookie: CookieService, private service: UserAuthService,
    private route: Router) { }

  ngOnInit(): void {
    this.info$ = this.service.getProfile();
    this.info$.subscribe(
      result => {
        this.userInfo = result;
        this.srcImg = 'https://avatars.dicebear.com/api/avataaars/' + this.userInfo.fullname + '.svg'
      })
  }
  onClick() { this.route.navigateByUrl("/home/admin/"); }
  ngAfterViewInit() {
    this.mainSidebarHeight.emit(this.mainSidebar.nativeElement.offsetHeight);
  }
}
