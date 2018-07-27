import { Component, OnInit } from '@angular/core';
import {UserService} from '../../../core/services/user.service';
import {SkillsService} from '../../../core/services/skills.service';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-skill-logs',
  templateUrl: './skill-logs.component.html',
  styleUrls: ['./skill-logs.component.css']
})
export class SkillLogsComponent implements OnInit {

  filtersShow:boolean = false;
  filters:any = {};
  Users:any = [];
  Skills:any = [];
  Object:any = Object;

  constructor(
    private UserService:UserService,
    private SkillsService: SkillsService
  ) { }

  ngOnInit() {

    this.UserService.getAllUsers().subscribe( users => {
      this.Users = users;
    });

    this.SkillsService.getAllSkills().subscribe( skills => {
      this.Skills = skills;
    })


  }

  showFilters() {
    this.filtersShow = !this.filtersShow;
  }
  applyFilters( form:NgForm ) {

    for(let key of Object.keys(form.value))
    {
      if(form.value[key] != '') {

        this.filters[key] = form.value[key];

      }
    }

    this.SkillsService.getLogs(this.filters).subscribe( skills => {

      console.log(skills);

    })

  }
}
