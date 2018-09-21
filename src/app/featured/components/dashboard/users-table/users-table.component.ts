import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {l} from '@angular/core/src/render3';

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
  sortByTotalMark($event) {

    let classList = $event.target.classList;


    if(classList.contains('fa-sort-amount-desc'))
    {
      this.users.sort(function(a, b){
        if(a.userSkills[0].marks > b.userSkills[0].marks) {
          return 1;
        } else if(a.userSkills[0].marks < b.userSkills[0].marks) {
          return -1;
        } else {
          return 0;
        }

      });

      classList.remove('fa-sort-amount-desc');
      classList.add('fa-sort-amount-asc');
    } else {
      this.users.sort(function(a, b){
        if(a.userSkills[0].marks < b.userSkills[0].marks) {
          return 1;
        } else if(a.userSkills[0].marks > b.userSkills[0].marks) {
          return -1;
        } else {
          return 0;
        }

      });

      classList.remove('fa-sort-amount-asc');
      classList.add('fa-sort-amount-desc');
    }
  }


  sortByDate(type, $event) {

    let classList = $event.target.classList;

    if(type == 'invitation')
    {

      if(classList.contains('fa-sort-amount-desc'))
      {
        this.users.sort(function(a, b){
          if(a.invitation_date > b.invitation_date) {
            return 1;
          } else if(a.invitation_date < b.invitation_date) {
            return -1;
          } else {
            return 0;
          }

        });

        classList.remove('fa-sort-amount-desc');
        classList.add('fa-sort-amount-asc');
      } else {
        this.users.sort(function(a, b){
          if(a.invitation_date < b.invitation_date) {
            return 1;
          } else if(a.invitation_date > b.invitation_date) {
            return -1;
          } else {
            return 0;
          }

        });

        classList.remove('fa-sort-amount-asc');
        classList.add('fa-sort-amount-desc');
      }


    } else if(type == 'active') {


      if(classList.contains('fa-sort-amount-desc'))
      {
        this.users.sort(function(a, b){
          if(a.updated_at > b.updated_at) {
            return 1;
          } else if(a.updated_at < b.updated_at) {
            return -1;
          } else {
            return 0;
          }

        });

        classList.remove('fa-sort-amount-desc');
        classList.add('fa-sort-amount-asc');
      } else {
        this.users.sort(function(a, b){
          if(a.updated_at < b.updated_at) {
            return 1;
          } else if(a.updated_at > b.updated_at) {
            return -1;
          } else {
            return 0;
          }

        });

        classList.remove('fa-sort-amount-asc');
        classList.add('fa-sort-amount-desc');
      }

    }

  }
}
