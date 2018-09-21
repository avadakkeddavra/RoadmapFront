import { Component, OnInit } from '@angular/core';
import {RoadmapService} from '../../../core/services/roadmap.service';
import {UserService} from '../../../core/services/user.service';
import {AuthService} from '../../../core/services/auth.service';

@Component({
  selector: 'app-roadmap',
  templateUrl: './roadmap.component.html',
  styleUrls: ['./roadmap.component.css']
})
export class RoadmapComponent implements OnInit {


  Roadmaps: any;

  constructor(
    private RoadmapService: RoadmapService,
    private UserSerice: UserService,
    private AuthService: AuthService
  ) { }

  ngOnInit() {

    let id = this.AuthService.userData().id;

    this.UserSerice.getUserRoadmaps(id).subscribe(roadmaps => {
     this.Roadmaps = roadmaps;
     console.log(this.Roadmaps);
    })

  }

}
