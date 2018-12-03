import { Component, OnInit } from '@angular/core';
import {UserService} from '../../../core/services/user.service';
import {SkillsService} from '../../../core/services/skills.service';
import {NgForm} from '@angular/forms';
import {AmChart, AmChartsService} from '@amcharts/amcharts3-angular';

@Component({
  selector: 'app-matching',
  templateUrl: './matching.component.html',
  styleUrls: ['./matching.component.css']
})
export class MatchingComponent implements OnInit {

  filters: any;
  Skills: any;
  Users: any;
  Compare: any;
  AmChart: AmChart;
  _skillsShow: Boolean = false;
  _object: any = Object;
  choosedSkills: any = {};

  constructor(
    private UsersService: UserService,
    private SkillsService: SkillsService,
    private AmChartService: AmChartsService
  ) { }

  ngOnInit() {
    this.SkillsService.getAllSkills().subscribe( skills => {
      this.Skills = skills;
    });

    this.UsersService.getAllUsers().subscribe( users => {
      this.Users = users;
    })
  }

  applyFilters(form: NgForm) {
    let body = form.value;
    let length = Object.keys(this.choosedSkills).length;

    body.skills = Object.keys(this.choosedSkills);

    this.SkillsService.compare(body).subscribe( response => {
      this.Compare = response;
      console.log(this.Compare);
      for(let key in this.Compare.compare)
      {
        let user = this.Compare.compare[key];
        this.Compare.compare[key].persent = Math.round((100 * Object.keys(user.compareSkills).length) / length);
      }
    })
  }

  drawChart(i)
  {
    console.log(this.Compare.compare[i]);

    let data:any = [];

    for(let comapre of this.Compare.compare[i].userSkills) {
      for(let skills of this.Compare.user.userSkills) {
        if(comapre.skill.title === skills.skill.title)
        {
          data.push({
            name:comapre.skill.title,
            mark:comapre.mark,
            mark2:skills.mark,
            current:skills.name
          });
        }
      }
    }

    console.log(data);

    this.initChart(data, this.Compare.compare[i].name);
  }
  showSkillsList(): void {
    this._skillsShow = !this._skillsShow;
  }

  chooseSkill(event, id, title = ''): void {
    if (this.choosedSkills[id]) {
      delete this.choosedSkills[id];
    } else {
      this.choosedSkills[id] = title;
    }
  }

  private initChart(data, user) {

    this.AmChart = this.AmChartService.makeChart( 'chartdiv', {
      "type": "radar",
      "theme": "light",
      "dataProvider": data,
      "valueAxes": [ {
        "axisTitleOffset": 0,
        "minimum": 0,
        "maximum":10,
        "axisAlpha": 0.15
      } ],
      "startDuration": 0.5,
      "graphs": [ {
        "balloonText": "[[value]] "+user,
        "bullet": "round",
        "lineThickness": 2,
        "valueField": "mark"
      }, {
        "balloonText": "[[value]] user",
        "bullet": "round",
        "lineThickness": 2,
        "valueField": "mark2"
      } ],
      "categoryField": "name",
      "currentField":"current",
      "export": {
        "enabled": true
      }
    } );

  }
}
