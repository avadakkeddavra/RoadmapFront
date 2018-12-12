import {Component, Input, OnInit} from '@angular/core';
import {AuthService} from '../../../../core/services/auth.service';
import {environment} from '../../../../../environments/environment';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css']
})
export class UserInfoComponent implements OnInit {

  @Input() user: any;
  env = environment.api;
  constructor(public AuthService: AuthService) { }

  ngOnInit() {
  }

}
