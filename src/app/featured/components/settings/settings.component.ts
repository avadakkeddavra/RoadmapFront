import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../../core/services/auth.service';
import {UserService} from '../../../core/services/user.service';
import {NgForm} from '@angular/forms';
import {toast} from 'angular2-materialize';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  user:any;
  settings:any;
  constructor(
    private AuthSettings: AuthService,
    private UserService: UserService
  ) { }

  ngOnInit() {
    this.user = this.AuthSettings.userData();
    this.UserService.getUsersSettings(this.user.id).subscribe(res => {
      this.settings = res;
    })
  }

  uploadAvatar(avatar) {
    const formData = new FormData();
    formData.append('avatar', avatar[0]);
    formData.append('userId', this.user.id);
    this.UserService.uploadAvatar(formData).subscribe(res => {
      let Response:any = res;
      this.user.avatar = Response.file;
      this.AuthSettings.rebuildToken(Response.token);
    })
  }

  updateUserData(form:NgForm) {
    console.log(form.controls)
  }

  setSettings(form:NgForm) {
    const body = {
      dev_years: form.controls.years.value,
      projects: form.controls.projects.value
    };

    this.UserService.setUserSettings(this.user.id, body).subscribe(res => {
      this.settings = res;
      toast('Setting was updated successfully', 1000);
    })
  }
}
