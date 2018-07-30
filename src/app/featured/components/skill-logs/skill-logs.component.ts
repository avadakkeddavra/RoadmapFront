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
  Logs:any;
  Object:any = Object;
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

    this.getLogs(1);

  }

  clearFilters() {
    this.filters = {};
    this.filters.userId = this.UsersIds;

    this.getLogs(1);
  }

  removeFilter(key) {
    delete this.filters[key];
    this.getLogs(1);
  }

  nextPage(Page) {

    this.getLogs(Page.page);
  }

  private getLogs(Page) {
    this.SkillsService.getLogs(this.filters, Page).subscribe( skills => {
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
