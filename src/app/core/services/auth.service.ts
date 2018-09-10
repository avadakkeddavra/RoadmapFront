import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthService {

  constructor(private Http: HttpClient) { }

  login(data)
  {

    console.log(data);
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/x-www-form-urlencoded'
      })
    };
    let sendData = "email="+data.email+"&password="+data.password;
    console.log(sendData);
    return this.Http.post('http://localhost:4200/api/login',sendData,httpOptions);
  }

    public user(): string {
      return localStorage.getItem('token');
    }

    public userData()
    {
      return jwt.decode(localStorage.getItem('token'))
    }

    rebuildToken(token) {
      localStorage.setItem('token',token);
    }
  }
