import { Component } from '@angular/core';
import {AuthService} from './core/services/auth.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  sideBarVisability = false;
  constructor(public AuthService: AuthService) {}
  sideBarToggle($event) {
    this.sideBarVisability = $event;
    console.log($event);
  }
}
