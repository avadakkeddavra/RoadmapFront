import { Component, OnInit } from '@angular/core';
import {UserService} from '../../../core/services/user.service';
import {ActivatedRoute, Router} from '@angular/router';
import {SkillsService} from '../../../core/services/skills.service';
import {AuthService} from '../../../core/services/auth.service';
import {toast} from 'angular2-materialize';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  User:any;
  Skills:any;
  TopSkills:Array<any> = [];
  Matched:Array<any> = [];
  constructor(
    private router: Router,
    private UserService: UserService,
    private route:ActivatedRoute,
    private AuthService: AuthService
  ) { }

  ngOnInit() {

    this.route.params.subscribe( params => {

      this.UserService.getUserStat(params.id).subscribe( response => {
        this.TopSkills = [];
        this.User = response;
        if( this.User.data.role === 1) {
          toast('This page unavaliable');
          this.router.navigate(['']);
        }
        let Skills = this.User.data.userSkills;

        for(let skill of Skills) {
          if(skill.mark > 6 && this.TopSkills.length < 10) {
            skill.name = skill.skill.title;
            this.TopSkills.push(skill);
          } else {
            continue;
          }
        }

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

  onSkillUpdate() {
    this.ngOnInit();
  }

}
