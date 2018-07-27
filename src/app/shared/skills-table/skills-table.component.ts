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
  @Input() user;
  @Output() backHandle = new EventEmitter();
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

}
