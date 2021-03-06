import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import * as jwt from 'jsonwebtoken';
import {environment} from 'environments/environment';

@Injectable()
export class AuthService {
  constructor(private Http: HttpClient) { }

  login(data) {
    return this.Http.post(`${environment.api}/api/login`, data);
  }

  register(data) {

    return this.Http.post(`${environment.api}/api/register`, data);
  }

    public user(): string {
      return localStorage.getItem('token');
    }

    public userData() {
      return jwt.decode(localStorage.getItem('token'));
    }

    rebuildToken(token) {
      localStorage.setItem('token', token);
    }

    logout() {
      localStorage.removeItem('token');
    }
  }
