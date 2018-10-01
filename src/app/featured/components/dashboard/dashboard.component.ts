import { Component, OnInit } from '@angular/core';
import {UserService} from '../../../core/services/user.service';
import {CategoryService} from '../../../core/services/catgory.service';
import {NgForm} from '@angular/forms';
import {SkillsService} from '../../../core/services/skills.service';
import {toast} from 'angular2-materialize';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  Users:any;
  UserSkills:any;
  Categories:Array<any> = [];
  ChoosedUser:any;
  Stats:any;
  constructor(
    private UserService: UserService,
    private CategoryService: CategoryService,
    private SkillsService: SkillsService
  ) { }

  ngOnInit() {

    this.UserService.getGlobalStats().subscribe(stats => {
      this.Stats = stats;
    });

    this.UserService.getAllUsers().subscribe( response => {
      this.Users = response;
      for(let user of this.Users) {
        user.status = {};
        if (user.userSkills[0].marks >= 960) {
          user.status.color = 'green';
          user.status.text = 'senior';
        } else if (user.userSkills[0].marks >= 480 && user.userSkills[0].marks < 960) {
          user.status.color = 'orange';
          user.status.text = 'middle';
        } else {
          user.status.color = 'grey';
          user.status.text = 'junior';
        }
      }
    });


  }

  async getUserSkills(user) {
    this.ChoosedUser = user;
    await this.CategoryService.getWithUserStats(user.id).subscribe( response => {
      let Response:any = response;
      this.Categories = Response;
      this.Categories.unshift({
        title: 'All',
        id:null,
        level: {
          color: 'grey'
        }
      });
      console.log(this.Categories);
    });
    this.UserService.getUserSkills(user.id,1).subscribe(response => {
      this.UserSkills = response;
      console.log(response)

    })
  }

  createSkill(form:NgForm) {

    const body = {
      title: form.controls.name.value,
      description: form.controls.description.value,
      category_id: form.controls.category_id.value,
    };

    this.SkillsService.create(body).subscribe( response => {
      let skill:any = response;
      toast(skill.data.title+' skill was created')
    }, error => {
        console.log(error);
    });
  }

  createCategory(form:NgForm)
  {

    const body = {
      title: form.controls.name.value,
      description: form.controls.description.value,
    };

    this.CategoryService.create(body).subscribe( response => {
      let category:any = response;
      toast(category.data.title+' category was created')
    })
  }

  sort(event) {
    this.UserService.getUserSkills(event.userId, 1, event.id).subscribe( response => {
      this.UserSkills = response
    })
  }
}
