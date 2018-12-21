import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import {UserService} from '../../core/services/user.service';
import {SkillsService} from '../../core/services/skills.service';
import {toast} from 'angular2-materialize';
import {AuthService} from '../../core/services/auth.service';


@Component({
  selector: 'app-skills-table-shared',
  templateUrl: './skills-table.component.html',
  styleUrls: ['./skills-table.component.css']
})
export class SkillsTableComponent implements OnInit, OnChanges {

  @Input() skills;
  @Input() categories;
  @Input() user;
  @Output() backHandle = new EventEmitter();
  @Output() sort = new EventEmitter();
  @Output() search = new EventEmitter();
  currentCat: number;
  showSearch: Boolean = false;
  searchString: string;
  SortedCategory: number;
  Editable: boolean;
  constructor(
    private UserService: UserService,
    private SkillsService: SkillsService,
    private authService: AuthService
  ) { }

  ngOnChanges() {
    const currUser = this.authService.userData();
    if (this.user.id === this.authService.userData().id || currUser.role === 1) {
      this.Editable = true;
    } else {
      this.Editable = false;
    }
  }
  ngOnInit() {}

  nextPage($event) {
    this.UserService.getUserSkills($event.userId, $event.page, this.currentCat, this.searchString).subscribe( response => {
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
    if(item.target.value < 1) {
      item.target.value = 1;
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
    this.SortedCategory = id;
    this.sort.emit({
      by: 'category',
      id: id,
      userId: this.user.id,
      searchValue: this.searchString
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
