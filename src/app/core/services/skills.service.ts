import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable()
export class SkillsService {

  constructor(private Http: HttpClient) { }

  update(body)
  {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };

    return this.Http.put('http://localhost:4200/api/skills', body ,httpOptions);
  }

  create(body) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };

    return this.Http.post('http://localhost:4200/api/skills', body ,httpOptions);
  }

  getAllSkills()
  {
    return this.Http.get('http://localhost:4200/api/skills/categories/list');
  }

  getSkills() {
    return this.Http.get('http://localhost:4200/api/skills/list');
  }

  getLogs(filters, Page)
  {
    return this.Http.post(`http://localhost:4200/api/skills/logs?page=${Page}`,filters);
  }

  compare(data) {
    return this.Http.post('http://localhost:4200/api/skills/compare',data);
  }

  sort(data) {
    return  this.Http.post('http://localhost:4200/api/skills/sort',data);
  }

  search(data) {
    return  this.Http.post('http://localhost:4200/api/skills/search',data);
  }

  delete(id) {
    return this.Http.delete(`http://localhost:4200/api/skills/${id}`)
  }
}
