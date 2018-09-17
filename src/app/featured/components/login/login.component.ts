import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../../core/services/auth.service';
import {Router} from '@angular/router';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  errors:Array<any> = [];
  registerForm:boolean = false;
  constructor(
    private AuthService: AuthService,
    public Router: Router
  ) { }

  ngOnInit() {
  }

  login(event, email:string, password:string) {

    let target = event.target;
    if((event instanceof KeyboardEvent && event.keyCode == 13) || (event instanceof MouseEvent && target.id == 'login')) {
      if(email != '' && password != '') {
        this.AuthService.login({
          email:email,
          password:password
        }).subscribe(

          response => {
                    console.log(response);
                    let Response:any = response;
                    console.log(response);
                    if(Response.success) {

                      let token:any = Response.token;
                      localStorage.setItem('token', token);
                      this.Router.navigate(['']);
                    }

              },
          errors => {

                if( typeof errors === 'object'){
                  this.errors = errors.error.error.details;
                } else {
                  this.errors = [];
                  this.errors[0] = {
                    message: errors.error
                  }
                }

                console.log(this.errors);
              })
      }
    }

  }

  register(event, name ,email, password) {

    let target = event.target;
    if((event instanceof KeyboardEvent && event.keyCode == 13) || (event instanceof MouseEvent && target.id == 'register')) {

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

        },
        errors => {

          if( typeof errors === 'object'){
            this.errors = errors.error.error.details;
          } else {
            this.errors = [];
            this.errors[0] = {
              message: errors.error
            }
          }

          console.log(this.errors);
        })
    }

  }
  toggleRegister(type) {
    if(type === 'register') {
      this.registerForm = true;
    }
    if(type === 'login') {
      this.registerForm = false;
    }

  }

}
