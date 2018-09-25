import { Component, OnInit } from '@angular/core';
import { RoadmapService } from '../../../core/services/roadmap.service';

@Component({
  selector: 'app-search-roadmaps',
  templateUrl: './search-roadmaps.component.html',
  styleUrls: ['./search-roadmaps.component.css']
})
export class SearchRoadmapsComponent implements OnInit {

  Roadmaps:any;
  constructor(
    private RoadmapService: RoadmapService
  ) { }

  ngOnInit() {
    this.RoadmapService.getAllRoadmaps().subscribe(roadmaps => {
      this.Roadmaps = roadmaps;
      console.log(this.Roadmaps)
    })
  }

}
