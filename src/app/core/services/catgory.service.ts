import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable()
export class CategoryService {

  constructor(private Http:HttpClient) { }

  get(id) {
    return this.Http.get(`http://localhost:4200/api/category/${id}`);
  }

  update(id,data) {
    return this.Http.put(`http://localhost:4200/api/category/${id}`,data);
  }

  all() {
    return this.Http.get('http://localhost:4200/api/category');
  }

  delete(id) {
    return this.Http.delete(`http://localhost:4200/api/category/${id}`);
  }

  create(data) {
    return this.Http.post(`http://localhost:4200/api/category`,data);
  }
}
