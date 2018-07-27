import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-users-table',
  templateUrl: './users-table.component.html',
  styleUrls: ['./users-table.component.css']
})
export class UsersTableComponent implements OnInit {


  @Input() users:any;
  @Output() showSkills = new EventEmitter();
  constructor() { }

  ngOnInit() {
  }

  showUserSkills(user) {
    this.showSkills.emit(user);
  }
}
