import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable()
export class UserService {

  constructor(private Http: HttpClient) { }

  getUser(id) {
    return this.Http.get(`http://localhost:4200/api/user/${id}`);
  }

  getAllUsers()
  {
    return this.Http.get('http://localhost:4200/api/users');
  }

  getUserSkills(id, page, catId = null) {

    return this.Http.get('http://localhost:4200/api/user/'+id+'/skillslist?page='+page+'&id='+catId)

  }

  getUserStat(id) {
    return this.Http.get(`http://localhost:4200/api/user/${id}/stat`);
  }

  getMatched(id) {
    return this.Http.get(`http://localhost:4200/api/skills/matched?userId=${id}`);
  }

  getUserSkillLogs(user_id, id) {
    return this.Http.get(`http://localhost:4200/api/user/${user_id}/logs/skills/${id}`);
  }

  getUserLogs(user_id) {
    return this.Http.get(`http://localhost:4200/api/user/${user_id}/logs`);
  }

  getAllUsersSkills() {
    return this.Http.get('http://localhost:4200/api/user/allskills');
  }

  uploadAvatar(data) {

    return this.Http.post('http://localhost:4200/api/user/avatar', data);
  }
  uploadBg(data) {

    return this.Http.post('http://localhost:4200/api/user/bg', data);
  }

  getUsersSettings(id) {
    return this.Http.get(`http://localhost:4200/api/user/settings/${id}`);
  }

  setUserSettings(id, data) {
    return this.Http.post(`http://localhost:4200/api/user/settings/${id}`, data);
  }

  getGlobalStats() {
    return this.Http.get(`http://localhost:4200/api/stat/`);
  }

  updateUserData(id, data) {
    return this.Http.put(`http://localhost:4200/api/user/edit/${id}`, data);
  }


  getUserRoadmaps(id) {
    return this.Http.get(`http://localhost:4200/api/user/${id}/roadmaps`);
  }

  getUserRoadmapCheckpoints(roadmap,id) {
    return this.Http.get(`http://localhost:4200/api/user/${id}/roadmap/${roadmap}/checkpoints`);
  }

  getUserRoadmapCheckpointTodos(roadmap, checkpoint, id) {
    return this.Http.get(`http://localhost:4200/api/user/${id}/roadmap/${roadmap}/checkpoint/${checkpoint}/todos`);
  }


  generateRoadmaps() {
    return this.Http.get('http://localhost:4200/api/user/roadmaps/generate');
  }
}

