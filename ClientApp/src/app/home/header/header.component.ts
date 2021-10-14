import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { UserAuthService } from '../../services/user-auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Output() toggleMenuSidebar: EventEmitter<any> = new EventEmitter<any>();
  constructor(private userService: UserAuthService, private route: Router) { }

  ngOnInit(): void {
  }
  onSignout() {
    this.userService.logout();
    this.route.navigate(['/auth/login']);
  }
}
