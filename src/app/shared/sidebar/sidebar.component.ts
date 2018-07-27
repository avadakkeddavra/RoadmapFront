import {Component, Input, OnInit} from '@angular/core';
import {AuthService} from '../../core/services/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  @Input() visible;
  className:string;
  id:number;
  constructor(
    private AuthService: AuthService
  ) { }

  ngOnInit() {

    this.id = this.AuthService.userData().id;

    if(this.visible) {
      this.className = '';
    } else {
      this.className = 'collapsed';
    }

    console.log(this.className);
  }

}
