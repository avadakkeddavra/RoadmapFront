import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../../core/services/auth.service';
import {UserService} from '../../../core/services/user.service';
import {NgForm} from '@angular/forms';
import {toast} from 'angular2-materialize';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  user:any;
  settings:any;

  imageChangedEvent: any = '';
  croppedImage: any = '';
  showUploadAvatarBtn:boolean = false;
  constructor(
    private Router: Router,
    private AuthSettings: AuthService,
    private UserService: UserService
  ) { }

  async ngOnInit() {
    await this.UserService.getUser(this.AuthSettings.userData().id).subscribe(user => {
      let User:any = user;
      this.user = User.data;
      this.user.avatar = `http://localhost:3010/assets/images/${this.user.avatar}`;

      this.UserService.getUsersSettings(this.user.id).subscribe(res => {
        this.settings = res;

        if(this.settings.bg_image) {
          this.settings.bg_image = 'http://localhost:3010/assets/images/'+this.settings.bg_image;
        } else {
          this.settings.bg_image = './../../../../assets/images/bg.jpg';
        }

        console.log(this.settings);
      })

    });


  }

  uploadAvatar() {

    this.UserService.uploadAvatar({avatar:this.croppedImage, userId: this.user.id}).subscribe(res => {
      let Response:any = res;
      this.user.avatar = `http://localhost:3010/assets/images/${Response.file}`;
      this.AuthSettings.rebuildToken(Response.token);
      toast('Avatar was updated');
    });
    
  }

  uploadBg(bg) {
    const formData = new FormData();
    formData.append('bg', bg[0]);
    formData.append('userId', this.user.id);

    this.UserService.uploadBg(formData).subscribe(res => {
      let Response:any = res;
      this.settings.bg_image =  'http://localhost:3010/assets/images/'+Response.bg
    })
  }

  updateUserData(form:NgForm) {

    let body = {};

    for(let item of Object.keys(form.controls)){
      let value = (form.controls[item].value).trim();
      if(value != '') {
        body[item] = form.controls[item].value;
      }
    }

    this.UserService.updateUserData(this.user.id, body).subscribe(user => {
      console.log(user);
    });
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
    
    fileChangeEvent(event: any): void {
        this.imageChangedEvent = event;
        this.showUploadAvatarBtn = true;
    }
    imageCropped(image: string) {
        this.croppedImage = image;
    }

}
