import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class TodoService {

  alias:string = 'http://localhost:4200/api/roadmap';

  constructor(private Http: HttpClient) { }

  create(roadmap,checkpoint,data) {
    return this.Http.post(this.alias+'/'+roadmap+'/checkpoint/'+checkpoint+'/todo',data);
  }

  assign(roadmap,checkpoint, id) {
    return this.Http.post(this.alias+'/'+roadmap+'/checkpoint/'+checkpoint+'/todo/'+id+'/assign',{});
  }

  unassign(id) {
    return this.Http.delete(`http://localhost:4200/api/todo/${id}/unassign`,{});
  }

  check(id,data) {
    return this.Http.put('http://localhost:4200/api/todo/'+id+'/check',data);
  }

  update(roadmap,checkpoint, id, data) {
    return this.Http.put(this.alias+'/'+roadmap+'/checkpoint/'+checkpoint+'/todo/'+id,data);
  }
}
