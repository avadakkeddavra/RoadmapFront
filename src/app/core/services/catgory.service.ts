import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from 'environments/environment';

@Injectable()
export class CategoryService {

  constructor(private Http: HttpClient) { }

  get(id) {
    return this.Http.get(`${environment.api}/api/category/${id}`);
  }

  update(id, data) {
    return this.Http.put(`${environment.api}/api/category/${id}`, data);
  }

  all() {
    return this.Http.get(`${environment.api}/api/category`);
  }

  delete(id) {
    return this.Http.delete(`${environment.api}/api/category/${id}`);
  }

  create(data) {
    return this.Http.post(`${environment.api}/api/category`, data);
  }
  search(data) {
    return this.Http.post(`${environment.api}/api/category/search`, data);
  }

  getWithUserStats(id) {
    return this.Http.get(`${environment.api}/api/category/user/${id}/stat`);
  }
}
