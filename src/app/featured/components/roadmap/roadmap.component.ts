import { Component, OnInit } from '@angular/core';
import {RoadmapService} from '../../../core/services/roadmap.service';
import {UserService} from '../../../core/services/user.service';
import {AuthService} from '../../../core/services/auth.service';
import { toast } from 'angular2-materialize';

@Component({
  selector: 'app-roadmap',
  templateUrl: './roadmap.component.html',
  styleUrls: ['./roadmap.component.css']
})
export class RoadmapComponent implements OnInit {


  Roadmaps: any;
  User: any;
  constructor(
    private RoadmapService: RoadmapService,
    private UserSerice: UserService,
    private AuthService: AuthService
  ) { }

  async ngOnInit() {

    this.User = await this.AuthService.userData();

    this.UserSerice.getUserRoadmaps(this.User.id).subscribe(roadmaps => {
     this.Roadmaps = roadmaps;
     console.log(this.Roadmaps);
    })

  }

  unassign(id, index) {
    this.RoadmapService.unassignUserToRoadmap(id).subscribe(res => {
      let roadmaps = [];
      for(let item of this.Roadmaps) {
        if(id != item.id) {
          roadmaps.push(item);
        }
      }
      this.Roadmaps = roadmaps;
    });
  }
  
  generate() {
    this.UserSerice.generateRoadmaps().subscribe(res => {
      this.Roadmaps = res;
    }, error => {
      console.log(error.error);
      toast(error.error.message)
    })
  }
}  
