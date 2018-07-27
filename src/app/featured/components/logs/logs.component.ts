import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {SkillsService} from '../../../core/services/skills.service';
import {UserService} from '../../../core/services/user.service';
import {AmChart, AmChartsService} from '@amcharts/amcharts3-angular';

@Component({
  selector: 'app-logs',
  templateUrl: './logs.component.html',
  styleUrls: ['./logs.component.css']
})
export class LogsComponent implements OnInit {

  skillId:number;
  userId:number;
  chart:AmChart;
  User:any;
  logs:Array<any> = [];
  constructor(
    private activeRoute: ActivatedRoute,
    private UserService: UserService,
    private AmChartsService: AmChartsService
  ) { }

  ngOnInit() {

    this.activeRoute.params.subscribe( params => {
      this.skillId = params.id;
      this.userId = params.user_id;

      this.UserService.getUserStat(this.userId).subscribe( response => {
        this.User = response;
      });

      this.UserService.getUserSkillLogs(this.userId, this.skillId).subscribe( async response => {
        let Response:any = response;

        for(let log of Response.data) {
          this.logs.push({
            value:log.skill_new,
            date:log.updatedAt
          })
        }

        this.initChart(this.logs);
      })

    })

  }
  initChart(data) {

    this.chart = this.AmChartsService.makeChart("chartdiv", {
      "type": "serial",
      "theme": "light",
      "marginRight": 40,
      "marginLeft": 40,
      "autoMarginOffset": 20,
      "mouseWheelZoomEnabled":true,
      "dataDateFormat": "YYYY-MM-DD",
      "valueAxes": [{
        "id": "v1",
        "axisAlpha": 0,
        "position": "left",
        "ignoreAxisWidth":true
      }],
      "balloon": {
        "borderThickness": 1,
        "shadowAlpha": 0
      },
      "graphs": [{
        "id": "g1",
        "balloonText": "[[value]]",
        "bullet": "round",
        "bulletBorderAlpha": 1,
        "bulletColor": "#FFFFFF",
        "hideBulletsCount": 50,
        "title": "red line",
        "valueField": "value",
        "useLineColorForBulletBorder": true,
        "balloon":{
          "drop":true
        }
      }],
      "chartCursor": {
        "pan": true,
        "valueLineEnabled": true,
        "valueLineBalloonEnabled": true,
        "cursorAlpha":1,
        "cursorColor":"#258cbb",
        "limitToGraph":"g1",
        "valueLineAlpha":0.2,
        "valueZoomable":true
      },
      "categoryField": "date",
      "categoryAxis": {
        "parseDates": true,
        "dashLength": 1,
        "minorGridEnabled": true
      },
      "export": {
        "enabled": true
      },
      "dataProvider": data
    });
  }

}
