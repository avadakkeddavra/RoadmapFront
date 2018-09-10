import { Component, OnInit } from '@angular/core';
import {CategoryService} from '../../../core/services/catgory.service';
import {SkillsService} from '../../../core/services/skills.service';
import {NgForm} from '@angular/forms';
import {toast} from 'angular2-materialize';

@Component({
  selector: 'app-skills-categories',
  templateUrl: './skills-categories.component.html',
  styleUrls: ['./skills-categories.component.css']
})
export class SkillsCategoriesComponent implements OnInit {


  filtersStatus:any = {
    category: false,
    skills: false
  };

  pagination:any = {
    category: [],
    skills: [],
  };

  Categories:any;
  Skills:any;

  constructor(
    private CategoryService: CategoryService,
    private SkillsService: SkillsService
  ) { }

  ngOnInit() {
    this.SkillsService.getSkills().subscribe(res => {
      const Response:any = res;
      this.Skills = Response.data;

      for(let i = 0; i < this.Skills.length; i++) {

        if(i >= 0 && i < 10) {
          this.Skills[i].show = true;
        } else {
          this.Skills[i].show = false;
        }

      }

      console.log(this.Skills);

      for(let i = 0; i < Math.round(Response.data.length/10); i++) {
        this.pagination.skills.push({
          number: i+1
        })
      }

    });
    this.CategoryService.all().subscribe( res => {
      const Response:any = res;
      this.Categories = Response.data;

      for(let i = 0; i < this.Categories.length; i++) {

        if(i >= 0 && i < 10) {
          this.Categories[i].show = true;
        } else {
          this.Categories[i].show = false;
        }

      }

      for(let i = 0; i < Math.round(Response.data.length/10); i++) {
        this.pagination.category.push({
          number: i+1
        });
      }
    })
  }

  filterItemsOfShow(type){
    if(type === 'skills') {
      return this.Skills.filter(x => x.show == true);
    } else {
      return this.Categories.filter(x => x.show == true);
    }
  }

  showFilters(type) {
    this.filtersStatus[type] = true;
  }

  closeFilters(type) {
    this.filtersStatus[type] = false;
  }

  searchCategory(title) {
    this.CategoryService.search({title: title}).subscribe(res => {
      let Response:any = res;

      this.Categories = Response;

      for(let i = 0; i < this.Categories.length; i++) {

        if(i >= 0 && i < 10) {
          this.Categories[i].show = true;
        } else {
          this.Categories[i].show = false;
        }

      }

      this.pagination.category = [];

      for(let i = 0; i < Math.round(Response.length/10); i++) {
        this.pagination.category.push({
          number: i+1
        });
      }


      console.log(this.pagination);
    })
  }

  searchSkill(title) {
    this.SkillsService.search({title: title}).subscribe(res => {
      const Response:any = res;
      this.Skills = Response;

      for(let i = 0; i < this.Skills.length; i++) {

        if(i >= 0 && i < 10) {
          this.Skills[i].show = true;
        } else {
          this.Skills[i].show = false;
        }

      }

      console.log(this.Skills);
      this.pagination.skills = [];
      for(let i = 0; i < Math.round(Response.length/10); i++) {
        this.pagination.skills.push({
          number: i+1
        })
      }

    })
  }

  showPage(type, page) {
    if(type === 'skill') {
      for(let i = 0; i < this.Skills.length; i++) {

        if(i >= page*10 && i < (10*page + 10)) {
          this.Skills[i].show = true;
        } else {
          this.Skills[i].show = false;
        }

      }
    } else {
      for(let i = 0; i < this.Categories.length; i++) {

        if(i >= page*10 && i < (page*10 + 10)) {
          this.Categories[i].show = true;
        } else {
          this.Categories[i].show = false;
        }

      }
    }
  }

  createSkill(form:NgForm) {

    const body = {
      title: form.controls.name.value,
      description: form.controls.description.value,
      category_id: form.controls.category_id.value,
    };

    this.SkillsService.create(body).subscribe( response => {
      let skill:any = response;
      toast(skill.data.title+' skill was created', 200)
    }, error => {
      console.log(error);
    });
  }

  createCategory(form:NgForm)
  {

    const body = {
      title: form.controls.title.value,
      description: form.controls.description.value,
    };

    this.CategoryService.create(body).subscribe( response => {
      let category:any = response;
      toast(category.data.title+' category was created',200)
    })
  }

  deleteCategory(id) {
    this.CategoryService.delete(id).subscribe(res => {
      console.log(res);
    })
  }

  deleteSkill(id) {
    this.SkillsService.delete(id).subscribe(res => {
      let Response:any = res;
      if(Response.success === true) {
        toast('Successfully deleted', 1000);
      }
    })
  }
}
