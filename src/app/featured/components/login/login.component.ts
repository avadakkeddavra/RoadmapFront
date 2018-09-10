import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../../core/services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  errors:Array<any>;
  registerForm:boolean = false;
  constructor(
    private AuthService: AuthService,
    public Router: Router
  ) { }

  ngOnInit() {
  }

  login(email:string, password:string) {
    this.AuthService.login({
      email:email,
      password:password
    }).subscribe( response => {

      let Response:any = response;
      console.log(response);
      if(Response.success) {

        let token:any = Response.token;
        localStorage.setItem('token', token);
        this.Router.navigate(['']);
      } else {
        this.errors = Response.errors;
      }

    })
  }

  register(name ,email, password) {
    this.AuthService.register({
      name: name,
      email:email,
      password:password
    }).subscribe( response => {

      let Response:any = response;
      console.log(response);
      if(Response.success) {

        let token:any = Response.token;
        localStorage.setItem('token', token);
        this.Router.navigate(['']);
      } else {
        this.errors = Response.errors;
      }

    })
  }
  toggleRegister() {
    this.registerForm = !this.registerForm;
  }
}
