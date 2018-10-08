import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../../core/services/user.service';

@Component({
  selector: 'app-roadmap-stat',
  templateUrl: './roadmap-stat.component.html',
  styleUrls: ['./roadmap-stat.component.css']
})
export class RoadmapStatComponent implements OnInit {

  Data: any = [];
  Stats: any;
  Object: any = Object;
  
  constructor(
    private ActiveRoute: ActivatedRoute,
    private UserService: UserService,
  ) { }

  ngOnInit() {
    this.ActiveRoute.params.subscribe(params  => {
      this.UserService.getUserRoadmapStats(params.id).subscribe(res => {
        let Response:any = res;
        this.Data = Response.data;
        this.Stats = Response.stats;
        console.log(Response);
      })
    })
  }

}
