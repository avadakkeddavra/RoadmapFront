import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from 'environments/environment';

@Injectable()
export class RoadmapService {

  alias = `${environment.api}/api/roadmap`;

  constructor(private Http: HttpClient) { }

  getSingleRoadmap(id) {
    return this.Http.get(this.alias + '/' + id);
  }

  assignUserToRoadmap(id) {
    return this.Http.post(this.alias + `/${id}/assign`, {});
  }

  unassignUserToRoadmap(id) {
    return this.Http.delete(this.alias + `/${id}/unassign`, {});
  }

  createRoadmap(data) {
    return this.Http.post(this.alias, data);
  }
  search(name = null, category = null, offset = null) {

    let params = '';

    if (name) {
      params += `name=${name}`;
    }

    if (category) {
      params += `&category=${category}`;
    }

    if(offset) {
      params += `&offset=${offset}`;
    }

    return this.Http.get(this.alias + `/search?${params}`);
  }
}

