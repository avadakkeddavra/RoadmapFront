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
  filters:any = {
    data: {},
    labels: {}
  };
  filtersArray:any = {};
  Users:any = [];
  Skills:any = [];
  Logs:any;
  Object:any = Object;
  SkillsArray: any = [];
  Pagination:any;
  UsersIds:any = [];

  constructor(
    private UserService:UserService,
    private SkillsService: SkillsService
  ) { }

  ngOnInit() {
    this.UserService.getAllUsers().subscribe( users => {
      this.Users = users;

      this.UsersIds = [];
      for(let user of this.Users) {
        this.UsersIds.push(user.id);
      }

      this.filters.userId = this.UsersIds;

      this.getLogs(1);

    });

    this.SkillsService.getAllSkills().subscribe( skills => {
      this.Skills = skills;
    });

    this.SkillsService.getSkills().subscribe(skills => {
      let Response:any = skills;
      this.SkillsArray = Response.data;
      console.log(this.SkillsArray);
    })
  }

  showFilters() {
    this.filtersShow = !this.filtersShow;
  }
  applyFilters( form:NgForm ) {
    console.log(form.controls);

    for(let key of Object.keys(form.value))
    {
      if(form.value[key] != '') {

        this.filters.data[key] = form.value[key];
        if(key === 'userId') {
          for(let id of form.value[key]) {
            for(let user of this.Users) {
              if(id == user.id){

                this.filters.labels[key] = [];
                this.filters.labels[key].push(user.name)

                this.filters.data[key] = [];
                this.filters.data[key].push(user.id)
              }
            }
          }
        }

        if(key === 'skillId') {
          for(let id of form.value[key]) {
            for(let skill of this.SkillsArray) {
              if(Number(id) === skill.id){
                this.filters.labels[key] = [];
                this.filters.labels[key].push(skill.title)

                this.filters.data[key] = [];
                this.filters.data[key].push(skill.id)
              }
            }

          }
        }
      }
    }

    this.getLogs(1);
    console.log(this.filters);
    console.log(this.Skills);
  }

  clearFilters() {
    this.filters.data = {};
    this.filters.labels = {};
    this.getLogs(1);
  }

  removeFilter(key) {
    this.filters.data[key] = [];
    this.getLogs(1);
  }

  nextPage(Page) {

    this.getLogs(Page.page);
  }

  private getLogs(Page) {
    this.SkillsService.getLogs(this.filters.data, Page).subscribe( skills => {
      this.paginationData(skills);
      this.Logs = skills;
    })
  }

  private paginationData(skills) {
    this.Pagination = {
      total: skills.total,
      userId: this.filters.userId
    };
  }
}
