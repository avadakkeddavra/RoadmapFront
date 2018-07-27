import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-top-skills',
  templateUrl: './top-skills.component.html',
  styleUrls: ['./top-skills.component.css']
})
export class TopSkillsComponent implements OnInit {

  @Input() skills:any;
  constructor() { }

  ngOnInit() {
  }

}
