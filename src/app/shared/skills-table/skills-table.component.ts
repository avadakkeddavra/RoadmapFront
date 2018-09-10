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
  constructor(
    private UserService:UserService,
    private SkillsService: SkillsService
  ) { }

  ngOnInit() {
  }

  nextPage($event) {
    console.log($event);
    this.UserService.getUserSkills($event.userId, $event.page).subscribe( response => {
      this.skills = response;
    });
  }

  updateSkill(field, item, userId, skillId) {
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
      toast(skill.skill.title+' successfully updated',2000)
      this.backHandle.emit(skill);
    })

  }

  sortByCategory(id) {
    this.sort.emit({
      by: 'category',
      id: id,
      userId: this.user.id
    });

    this.categories.map( function(cat, i) {
        if(cat.id === id) {
          cat.highlight = true;
        } else {
          cat.highlight = false;
        }
    });
  }

  sortSkills(column, event) {

    if(event.target.classList.contains('fa-sort-amount-desc'))
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

      event.target.classList.remove('fa-sort-amount-desc');
      event.target.classList.add('fa-sort-amount-asc');

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
      event.target.classList.remove('fa-sort-amount-asc');
      event.target.classList.add('fa-sort-amount-desc');
    }
  }
}
