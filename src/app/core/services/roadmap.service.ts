import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class RoadmapService {

  alias:string = 'http://localhost:4200/api/roadmap';

  constructor(private Http: HttpClient) { }

  getAllRoadmaps() {
    return this.Http.get(this.alias);
  }

  assignUserToRoadmap(id) {
    return this.Http.post(this.alias+`/${id}/assign`);
  }

  unassignUserToRoadmap() {
    return this.Http.delete(this.alias+`/${id}/unassign`);
  }

  createRoadmap(data) {
    return this.Http.post(this.alias, data);
  }
}
