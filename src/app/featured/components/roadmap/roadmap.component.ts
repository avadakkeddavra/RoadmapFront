import { Component, OnInit } from '@angular/core';
import {RoadmapService} from '../../../core/services/roadmap.service';
import {UserService} from '../../../core/services/user.service';
import {AuthService} from '../../../core/services/auth.service';
import { toast } from 'angular2-materialize';
import { Masonry, MasonryGridItem } from 'ng-masonry-grid';


@Component({
  selector: 'app-roadmap',
  templateUrl: './roadmap.component.html',
  styleUrls: ['./roadmap.component.css']
})
export class RoadmapComponent implements OnInit {

  filters:any = {
    name: null,
    category: null,
    offset: null
  };
  SearchRoadmaps: any = [];
  Roadmaps: any = [];
  User: any;
  _toggleFlag: boolean = true;

  _masonry: Masonry;
  constructor(
    private RoadmapService: RoadmapService,
    private UserSerice: UserService,
    private AuthService: AuthService
  ) { }

  onNgMasonryInit($event: Masonry) {
    console.log($event);
    this._masonry = $event;
  }

  ngOnInit() {

    this.User = this.AuthService.userData();

    this.UserSerice.getUserRoadmaps(this.User.id).subscribe((roadmaps: any) => {
      roadmaps.mentor_roadmaps.map((item) => {
        item.mentor = true;
        this.Roadmaps.push(item);
      });
      roadmaps.roadmaps.map((item) => {
        item.mentor = false;
        this.Roadmaps.push(item);
      });
     console.log(this.Roadmaps);
    });

  }
  toggleRoadmaps(flag: boolean) {
    this._toggleFlag = flag;
    console.log(this._toggleFlag);
  }

  focusOnSearch() {
      const evt = new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
        view: window
      });
      const canceled = !document.querySelector('a.results-tab').dispatchEvent(evt);
  }
  unassign(id) {
    this.RoadmapService.unassignUserToRoadmap(id).subscribe(res => {
      const roadmaps = [];
      for (let item of this.Roadmaps) {
        if (id !== item.id) {
          roadmaps.push(item);
        }
      }
      this.Roadmaps = roadmaps;
    });
  }

  generate() {
    this.UserSerice.generateRoadmaps().subscribe((res: any) => {
      this.Roadmaps = res.roadmaps.concat(res.mentor_roadmaps);
    }, error => {
      console.log(error.error);
      toast(error.error.message);
    });
  }

  search(name) {
    if (name.length > 0) {
      this.filters.name = name;
      this.RoadmapService.search(name, '').subscribe(roadmaps => {
        this.SearchRoadmaps = roadmaps;
        console.log(this.SearchRoadmaps);
      });
    }
  }

  loadmore(data) {
    console.log(data);
    this.RoadmapService.search(this.filters.name,this.filters.category, this.SearchRoadmaps.length).subscribe((res: any) => {
      for (let item of res) {
        this.SearchRoadmaps.push(item);
      }
    });
  }

  addItems(item) {
    this.Roadmaps.push(item);
  }

  async assign($event) {
    await this.RoadmapService.assignUserToRoadmap($event.id).subscribe( async res => {
      await this.Roadmaps.push($event.roadmap);
      this.toggleRoadmaps(true);
      toast('Assigned', 2000);
    });
  }
}

