import { Component, OnInit } from '@angular/core';
import {UserService} from '../../../core/services/user.service';
import {ActivatedRoute, Router} from '@angular/router';
import {SkillsService} from '../../../core/services/skills.service';
import {AuthService} from '../../../core/services/auth.service';
import {toast} from 'angular2-materialize';
import {CategoryService} from '../../../core/services/catgory.service';
import {environment} from '../../../../environments/environment';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  User: any;
  Skills: any;
  AimSkills: Array<any> = [];
  Matched: Array<any> = [];
  Categories: any = [];
  constructor(
    private router: Router,
    private UserService: UserService,
    private route: ActivatedRoute,
    private AuthService: AuthService,
    private CategorySevice: CategoryService
  ) { }

  ngOnInit() {


    this.route.params.subscribe( params => {

      this.CategorySevice.getWithUserStats(params.id).subscribe(res => {
        this.Categories = res;
        this.Categories.unshift({
          title: 'All',
          id: null,
          level: {
            color: 'grey'
          }
        });
        console.log(this.Categories);
      });

      this.UserService.getUserStat(params.id).subscribe( response => {
        this.User = response;
        if (this.User.data.role === 1) {
          toast('This page unavaliable',2000);
          this.router.navigate(['']);
        }
        if (this.User.data.user_setting && this.User.data.user_setting.bg_image) {
          this.User.data.user_setting.bg_image = environment.api + '/api/assets/images/' + this.User.data.user_setting.bg_image;
        } else {
          this.User.data.user_setting = {};
          this.User.data.user_setting.bg_image = '/assets/images/bg.jpg';
        }
        const Skills = this.User.data.userSkills;

        for (const skill of Skills) {
          if (skill.skill.title.length > 46) {
            skill.skill.title = skill.skill.title.substr(0,43) + '...';
          }

          if (Number(skill.disposition) >= 7 ) {
            skill.name = skill.skill.title;
            this.AimSkills.push(skill);
          }
          this.AimSkills.sort(function (a, b) {
            if (a.disposition < b.disposition) {
              return 1;
            } else if (a.disposition > b.disposition) {
              return -1;
            } else {
              return 0;
            }
          });
        }
        this.AimSkills = this.AimSkills.splice(0, 15);
      });

      this.UserService.getMatched(params.id).subscribe( response => {
        let Response: any = response;
        this.Matched = Response[0].compare;

      });

      this.UserService.getUserSkills(params.id, 1).subscribe( response => {
        this.Skills = response;
      });
    });
  }

  onSkillUpdate($event) {
    console.log($event);
    if ($event.mark < 7 && $event.aim < 7) {
      return;
    }
    const index = $event.index;
    delete $event.index;
    this.Skills[index] = $event;

    const AimSkills = [];
    let flag = false;

    for ( let i in this.AimSkills) {
      let skill = this.AimSkills[i];

      if (skill.name === $event.skill.title) {
        skill = {};
        skill = $event;
        flag = true;
      }

      if (skill.disposition >= 7) {
        AimSkills.push(skill);
      }
    }

    if (!flag && $event.disposition >= 7) {
      AimSkills.push($event);
      AimSkills.sort( function(a, b) {
        if (a.disposition < b.disposition) {
          return 1;
        } else if (a.disposition > b.disposition) {
          return -1;
        } else {
          return 0;
        }
      });
      this.AimSkills = AimSkills.splice(0,15);
    }
  }

  sort(event) {
    this.UserService.getUserSkills(event.userId, 1, event.id, event.searchValue).subscribe( response => {
      this.Skills = response;
    });
  }

  onSearch(event) {
    if (!event.category) {
      event.category = null;
    }
    this.UserService.getUserSkills(this.User.data.id, 1, event.category, event.title).subscribe((data: any) => {
      this.Skills = data;
    });
  }
}
