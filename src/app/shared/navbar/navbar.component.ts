import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {AuthService} from '../../core/services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  sideBarStatus = true;
  user:any;
  @Output() sideBarVisible = new EventEmitter();

  constructor(
    private AuthService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    this.user = this.AuthService.userData()
  }

  toggleSidebar() {
    this.sideBarStatus = !this.sideBarStatus;
    this.sideBarVisible.emit(this.sideBarStatus);
  }

  logout() {
    this.AuthService.logout();
    this.router.navigate(['login']);
  }
}
