import {Component, Input, OnInit} from '@angular/core';
import {AuthService} from '../../../../core/services/auth.service';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css']
})
export class UserInfoComponent implements OnInit {

  @Input() user:any;
  constructor(public AuthService: AuthService) { }

  ngOnInit() {
  }

}
