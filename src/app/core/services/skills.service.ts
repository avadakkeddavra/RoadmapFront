import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from 'environments/environment';

@Injectable()
export class SkillsService {

  constructor(private Http: HttpClient) { }

  update(body) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };

    return this.Http.put(`${environment.api}/api/skills`, body , httpOptions);
  }

  updateSkillData(id, data) {
    return this.Http.put(`${environment.api}/api/skills/${id}`, data);
  }

  create(body) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };

    return this.Http.post(`${environment.api}/api/skills`, body, httpOptions);
  }

  getAllSkills() {
    return this.Http.get(`${environment.api}/api/skills/categories/list`);
  }

  getSkills() {
    return this.Http.get(`${environment.api}/api/skills/list`);
  }

  getLogs(filters, Page) {
    return this.Http.post(`${environment.api}/api/skills/logs?page=${Page}`, filters);
  }

  compare(data) {
    return this.Http.post(`${environment.api}/api/skills/compare`, data);
  }

  sort(data) {
    return  this.Http.post(`${environment.api}/api/skills/sort`, data);
  }

  search(data) {
    return  this.Http.post(`${environment.api}/api/skills/search`, data);
  }

  delete(id) {
    return this.Http.delete(`${environment.api}/api/skills/${id}`);
  }
}
