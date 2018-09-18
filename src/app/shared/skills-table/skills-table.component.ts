import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {UserService} from '../../core/services/user.service';
import {SkillsService} from '../../core/services/skills.service';
import {toast} from 'angular2-materialize';


@Component({
  selector: 'app-skills-table-shared',
  templateUrl: './skills-table.component.html',
  styleUrls: ['./skills-table.component.css']
})
export class SkillsTableComponent implements OnInit {

  @Input() skills;
  @Input() categories;
  @Input() user;
  @Output() backHandle = new EventEmitter();
  @Output() sort = new EventEmitter();
  currentCat:number;
  constructor(
    private UserService:UserService,
    private SkillsService: SkillsService
  ) { }

  ngOnInit() {
  }

  nextPage($event) {
    console.log($event);
    this.UserService.getUserSkills($event.userId, $event.page, this.currentCat).subscribe( response => {
      this.skills = response;
    });
  }

  updateSkill(field, item, userId, skillId, index = null) {
    let body = {
      userId:userId,
      skillId: skillId
    };

    if(item.target.value > 10) {
      item.target.value = 10;
    }
    body[field] = item.target.value;

    this.SkillsService.update(body).subscribe(response => {
      let skill:any = response;
      skill.name = skill.skill.title;
      toast(skill.skill.title+' successfully updated',2000)
      skill.index = index;
      this.backHandle.emit(skill);
    });

  }

  sortByCategory(id) {
    this.sort.emit({
      by: 'category',
      id: id,
      userId: this.user.id
    });
    let $this = this;
    this.categories.map( function(cat, i) {
        if(cat.id === id) {
          cat.highlight = true;
          $this.currentCat = id;
        } else {
          cat.highlight = false;
        }
        if(id === null) {
          $this.currentCat = null;
        }
    });
  }

  sortSkills(column, event) {

    if(event.target.classList.contains('fa-sort-amount-asc'))
    {
      if(column !== 'title') {
        this.skills.skills.sort(function(a,b){

          if(a.userSkill[column] < b.userSkill[column]){
            return 1;
          }

          if(a.userSkill[column] > b.userSkill[column]){
            return -1;
          }
          return 0;
        });
      } else {
        this.skills.skills.sort(function(a,b){

          if(a[column] > b[column]){
            return 1;
          }

          if(a[column] < b[column]){
            return -1;
          }
          return 0;
        });
      }

      event.target.classList.remove('fa-sort-amount-asc');
      event.target.classList.add('fa-sort-amount-desc');

    } else {
        if(column !== 'title') {
          this.skills.skills.sort(function(a,b){

            if(a.userSkill[column] > b.userSkill[column]){
              return 1;
            }

            if(a.userSkill[column] < b.userSkill[column]){
              return -1;
            }
            return 0;
          });
        } else {
          this.skills.skills.sort(function(a,b){

            if(a[column] < b[column]){
              return 1;
            }

            if(a[column] > b[column]){
              return -1;
            }
            return 0;
          });
        }
      event.target.classList.remove('fa-sort-amount-desc');
      event.target.classList.add('fa-sort-amount-asc');
    }
  }
}
