import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class CheckpointService {

  alias:string = 'http://localhost:4200/api/roadmap';

  constructor(private Http: HttpClient) { }

  create(roadmap_id,data) {
    return this.Http.post(this.alias+'/'+roadmap_id+'/checkpoint',data);
  }

  assign(roadmap_id,id) {
    return this.Http.post(this.alias+'/'+roadmap_id+'/checkpoint/'+id+'/assign',{});

  }

  unassign(roadmap_id,id) {
    return this.Http.delete(this.alias+'/'+roadmap_id+'/checkpoint/'+id+'/unassign',{});

  }

  swap(roadmap_id,id) {
    return this.Http.post(this.alias+'/'+roadmap_id+'/checkpoint/'+id+'/swap',{});

  }
}
