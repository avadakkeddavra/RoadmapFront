import {Component, Input, OnInit} from '@angular/core';
import {AuthService} from '../../core/services/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  @Input() visible;
  className: string;
  User;
  constructor(
    private AuthService: AuthService
  ) { }

  ngOnInit() {

    this.User = this.AuthService.userData();
    if (this.visible) {
      this.className = '';
    } else {
      this.className = 'collapsed';
    }
  }

}
