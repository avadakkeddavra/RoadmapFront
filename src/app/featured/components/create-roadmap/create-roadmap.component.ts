import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../../core/services/catgory.service';
import { RoadmapService } from '../../../core/services/roadmap.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-roadmap',
  templateUrl: './create-roadmap.component.html',
  styleUrls: ['./create-roadmap.component.css']
})
export class CreateRoadmapComponent implements OnInit {

  Categories: any;
  Errors: any = {
    data: [],
    title: ''
  };
  constructor(
    private CategoryService: CategoryService,
    private RoadmapService: RoadmapService,
    private Router: Router
  ) { }

  ngOnInit() {
    this.CategoryService.all().subscribe(categories => {
      let Response:any = categories;
      this.Categories = Response.data;
    })
  }
  create(form:NgForm) {
    console.log(form.value);

    this.RoadmapService.createRoadmap(form.value).subscribe(roadmap => {
      let Response:any = roadmap; 
      this.Router.navigate([`/roadmap/${Response.id}`])
    }, error => {
      this.Errors = {data:[], title:''};
      this.Errors.data = error.error.details;
      this.Errors.title = 'Roadmap creation error'
    })
  }

}
