import { Component, OnInit, Renderer2, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import {
  Event,
  NavigationCancel,
  NavigationEnd,
  NavigationError,
  NavigationStart,
} from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { UserAuthService } from '../services/user-auth.service'
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public sidebarMenuOpened = false;
  @ViewChild('contentWrapper', { static: false }) contentWrapper:any;
  constructor(private renderer: Renderer2, private spinner: NgxSpinnerService,
    private router: Router, private service: UserAuthService) { }

  ngOnInit(): void {
    this.renderer.removeClass(document.querySelector('app-root'), 'login-page');
    this.router.navigateByUrl('/home/admin/dashboard');
  }
  mainSidebarHeight(height:any) {
    this.renderer.setStyle(
      this.contentWrapper.nativeElement,
      'min-height',
      height - 20 + 'px'
    );
  }
  toggleMenuSidebar() {
    if (this.sidebarMenuOpened) {
      this.renderer.removeClass(
        document.querySelector('app-root'),
        'sidebar-open'
      );
      this.renderer.addClass(
        document.querySelector('app-root'),
        'sidebar-collapse'
      );
      this.sidebarMenuOpened = false;
    } else {
      this.renderer.removeClass(
        document.querySelector('app-root'),
        'sidebar-collapse'
      );
      this.renderer.addClass(
        document.querySelector('app-root'),
        'sidebar-open'
      );
      this.sidebarMenuOpened = true;
    }
  }
}
