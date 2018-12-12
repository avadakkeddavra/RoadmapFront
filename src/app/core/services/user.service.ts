import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from 'environments/environment';

@Injectable()
export class UserService {

  constructor(private Http: HttpClient) { }

  getUser(id) {
    return this.Http.get(`${environment.api}/api/user/${id}`);
  }

  getAllUsers() {
    return this.Http.get(`${environment.api}/api/users`);
  }

  getUserSkills(id, page, catId = null, name = '') {

    return this.Http.get(`${environment.api}/api/user/` + id + '/skillslist?page=' + page + '&id=' + catId + '&name=' + name);

  }

  getUserStat(id) {
    return this.Http.get(`${environment.api}/api/user/${id}/stat`);
  }

  getMatched(id) {
    return this.Http.get(`${environment.api}/api/skills/matched?userId=${id}`);
  }

  getUserSkillLogs(user_id, id) {
    return this.Http.get(`${environment.api}/api/user/${user_id}/logs/skills/${id}`);
  }

  uploadAvatar(data) {
    return this.Http.post(`${environment.api}/api/user/avatar`, data);
  }
  uploadBg(data) {

    return this.Http.post(`${environment.api}/api/user/bg`, data);
  }

  getUsersSettings(id) {
    return this.Http.get(`${environment.api}/api/user/settings/${id}`);
  }

  setUserSettings(id, data) {
    return this.Http.post(`${environment.api}/api/user/settings/${id}`, data);
  }

  getGlobalStats() {
    return this.Http.get(`${environment.api}/api/stat/`);
  }

  updateUserData(id, data) {
    return this.Http.put(`${environment.api}/api/user/edit/${id}`, data);
  }


  getUserRoadmaps(id) {
    return this.Http.get(`${environment.api}/api/user/${id}/roadmaps`);
  }

  getUserRoadmapCheckpoints(roadmap, id) {
    return this.Http.get(`${environment.api}/api/user/${id}/roadmap/${roadmap}/checkpoints`);
  }

  generateRoadmaps() {
    return this.Http.get(`${environment.api}/api/user/roadmaps/generate`);
  }

  getUserRoadmapStats(id) {
    return this.Http.get(`${environment.api}/api/user/roadmap-stats/${id}`);
  }
}
