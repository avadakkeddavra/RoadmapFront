import {Component, Input, OnInit} from '@angular/core';
import {UserService} from '../../../../core/services/user.service';

@Component({
  selector: 'app-best-matched',
  templateUrl: './best-matched.component.html',
  styleUrls: ['./best-matched.component.css']
})
export class BestMatchedComponent implements OnInit {

  @Input() matched:any;
  constructor(
    private UserService: UserService
  ) { }

  ngOnInit() {

  }

}
