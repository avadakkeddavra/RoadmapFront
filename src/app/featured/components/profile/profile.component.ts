import { Component, OnInit } from '@angular/core';
import {UserService} from '../../../core/services/user.service';
import {ActivatedRoute, Router} from '@angular/router';
import {SkillsService} from '../../../core/services/skills.service';
import {AuthService} from '../../../core/services/auth.service';
import {toast} from 'angular2-materialize';
import {CategoryService} from '../../../core/services/catgory.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  User:any;
  Skills:any;
  TopSkills:Array<any> = [];
  AimSkills: Array<any> = [];
  Matched:Array<any> = [];
  Categories: any = [];
  constructor(
    private router: Router,
    private UserService: UserService,
    private route:ActivatedRoute,
    private AuthService: AuthService,
    private CategorySevice: CategoryService
  ) { }

  ngOnInit() {


    this.route.params.subscribe( params => {

      this.CategorySevice.getWithUserStats(params.id).subscribe(res => {
        this.Categories = res;
        this.Categories.unshift({
          title: 'All',
          id:null,
          level: {
            color: 'grey'
          }
        });
        console.log(this.Categories);
      });

      this.UserService.getUserStat(params.id).subscribe( response => {
        this.TopSkills = [];
        this.User = response;
        if( this.User.data.role === 1) {
          toast('This page unavaliable',2000);
          this.router.navigate(['']);
        }
        if(this.User.data.user_setting && this.User.data.user_setting.bg_image) {
          this.User.data.user_setting.bg_image = 'http://localhost:3010/assets/images/'+this.User.data.user_setting.bg_image;
        } else {
          this.User.data.user_setting = {};
          this.User.data.user_setting.bg_image = './../../../../../assets/images/bg.jpg';
        }
        let Skills = this.User.data.userSkills;

        for(let skill of Skills) {
          if(skill.skill.title.length > 46) {
            skill.skill.title = skill.skill.title.substr(0,43)+'...';
          }
          if(Number(skill.mark) >= 7 && this.TopSkills.length < 15) {
            skill.name = skill.skill.title;
            this.TopSkills.push(skill);
          }

          if(Number(skill.disposition) >= 7 ) {
            skill.name = skill.skill.title;
            this.AimSkills.push(skill);
          }
          
        }
        console.log(this.AimSkills)
        this.TopSkills.sort(function(a, b) {
          if (a.mark > b.mark ) {
            return -1;
          }
          if (a.mark < b.mark) {
            return 1;
          }
          return 0;
        });
      });

      this.UserService.getMatched(params.id).subscribe( response => {
        let Response:any = response;
        this.Matched = Response[0].compare;

      });

      this.UserService.getUserSkills(params.id, 1).subscribe( response => {
        this.Skills = response;

      })
    })

    
  }

  onSkillUpdate($event) {

    if($event.mark < 7) {
      return;
    }
  
    let index = $event.index;
    delete $event.index;
    this.Skills[index] = $event;

    let TopSkills = [];

    let flag = false;

    for(let i in this.TopSkills) {
      let skill = this.TopSkills[i];

      if(skill.name === $event.skill.title) {
        skill = {};
        skill = $event;
        flag = true;
      }

      if(skill.mark >= 7) {
        TopSkills.push(skill);
      }

    }

    if(!flag && $event.mark >= 7) {
      TopSkills.push($event);
    }

    this.TopSkills = [];

    this.TopSkills = TopSkills;
    console.log(this.TopSkills);
  }

  sort(event) {
    this.UserService.getUserSkills(event.userId, 1, event.id).subscribe( response => {
      this.Skills = response
    })
  }
}
