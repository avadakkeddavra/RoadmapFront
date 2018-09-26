import { Component, OnInit, EventEmitter } from '@angular/core';
import {CategoryService} from '../../../core/services/catgory.service';
import {SkillsService} from '../../../core/services/skills.service';
import {MaterializeAction} from 'angular2-materialize';
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
  modalErrors = new EventEmitter<string|MaterializeAction>();
  errors: any = {
    data: [],
    title: ''
  };

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

      this.pagination.skills[0].current = true;

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
          number: i+1,
          current:false
        });
      }
      this.pagination.category[0].current = true;
    })
  }

  private openErrorsModal() {
    this.modalErrors.emit({action:"modal",params:['open']});
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
          number: i+1,
          current:false
        });
      }
      this.pagination.category[0].current = true;
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
          number: i+1,
          current: false
        })
      }
      this.pagination.skills[0].current = true;
    })
  }

  showPage(type, page, pageInfo) {

    for(let pag of this.pagination.skills) {
      if(page+1 == pag.number) {
        pag.current = true
      } else {
        pag.current = false
      }

    }

    if(type === 'skill') {

      let countVisable = 1;

      for(let i = 0; i < this.Skills.length; i++) {

        if(pageInfo.cat && pageInfo.cat > 0) {


          if(this.Skills[i].categoryId == pageInfo.cat) {

            if(countVisable > page*10 && countVisable <= (page*10)+10) {
              this.Skills[i].show = true;
            } else {
              this.Skills[i].show = false;
            }
            countVisable++;
          }

        } else {

          if(i+1 > page*10 && i+1 <= (page*10)+10) {
            this.Skills[i].show = true;

          } else {
            this.Skills[i].show = false;
          }

        }
      }

      console.log(this.Skills);
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
    }, errors => {
      this.generateErrors('Skill creation', errors.error.error);     
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
      if(category.success) {
        this.Categories.unshift(category.data)
        toast(category.data.title+' category was created',200)
      }       
    },errors => {
        this.generateErrors('Category creation', errors.error.error);      
    })
  }

  private generateErrors(type:string, Errors:Array<any>) {
    this.errors = {data:[], title: ''};
    this.errors.data = Errors;
    this.errors.title = type;
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


  sortByCategory(catId:number) {
    console.log(catId);
    let countVisable = 1;
    for(let skill of this.Skills) {

      if(Number(skill.categoryId) == catId) {
        if(countVisable <= 10) {
          skill.show = true;
        } else {
          skill.show = false;
        }
        countVisable++;
      } else {
        skill.show = false;
      }
    }
    this.pagination.skills = [];
    for(let i = 0; i < Math.round(countVisable/10); i++) {
      this.pagination.skills.push({
        number: i+1,
        cat: catId,
        current: false
      })
    }
    this.pagination.skills[0].current = true;
  }

  updateCategory(type:string,value: string, id) {
    const body = {};
    body[type] = value;
    this.CategoryService.update(id, body).subscribe(category => {
      let Response:any = category;
      if(Response.success) {
        toast('Category was updated', 1000);
      }
    })
  }

  updateSkill(type:string,value: string, id) {
    const body = {};
    body[type] = value;
    this.SkillsService.updateSkillData(id, body).subscribe(category => {
      let Response:any = category;
      if(Response.success) {
        toast('Skill was updated', 1000);
      }
    })
  }
}
