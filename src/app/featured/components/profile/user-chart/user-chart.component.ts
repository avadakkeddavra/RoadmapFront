import {Component, Input, OnInit} from '@angular/core';
import {AmChart, AmChartsService} from '@amcharts/amcharts3-angular';
import {init} from 'protractor/built/launcher';

@Component({
  selector: 'app-user-chart',
  templateUrl: './user-chart.component.html',
  styleUrls: ['./user-chart.component.css']
})
export class UserChartComponent implements OnInit {

  @Input() set skills(data){
    if(data != undefined)
    {
      this.initChart(data);
    }
  };
  AmChart:AmChart;
  constructor(
    private AmChartService: AmChartsService
  ) { }

  ngOnInit() {}

  initChart(data) {

    this.AmChart = this.AmChartService.makeChart("chartdiv",{
      "type": "radar",
      "theme": "light",
      "dataProvider": data,
      "valueAxes": [ {
        "axisTitleOffset": 0,
        "minimum": 0,
        "maximum":10,
        "axisAlpha": 0.15
      } ],
      "startDuration": 2,
      "graphs": [ {
        "balloonText": "[[value]] Mark",
        "bullet": "round",
        "lineThickness": 2,
        "valueField": "mark"
      } ],
      "categoryField": "name",
      "export": {
        "enabled": true
      }
    } );

  }

}
