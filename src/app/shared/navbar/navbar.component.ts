import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  sideBarStatus = true;
  @Output() sideBarVisible = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  toggleSidebar() {
    this.sideBarStatus = !this.sideBarStatus;
    this.sideBarVisible.emit(this.sideBarStatus);
  }
}
