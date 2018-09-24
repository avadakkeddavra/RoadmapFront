import { Component, OnInit, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../../../core/services/user.service';
import { CheckpointService } from '../../../core/services/checkpoint.service';
import { TodoService } from '../../../core/services/todo.service';
import { RoadmapService } from '../../../core/services/roadmap.service';
import { AuthService } from '../../../core/services/auth.service';
import { SkillsService } from '../../../core/services/skills.service';

import { MaterializeAction } from 'angular2-materialize';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-roadmap-page',
  templateUrl: './roadmap-page.component.html',
  styleUrls: ['./roadmap-page.component.css']
}) 
export class RoadmapPageComponent implements OnInit {

  Checkpoints:any;
  Todos:any;
  Roadmap:any;
  modalActions = new EventEmitter<string|MaterializeAction>();
  searchAction = new EventEmitter<string|MaterializeAction>();
  createCheckpointAction = new EventEmitter<string|MaterializeAction>();
  ActiveCheckpoint:any;
  DiscoverCheckpoints: any;
  Skills:any;


  constructor(
    private router: ActivatedRoute,
    private UserService: UserService,
    private AuthService: AuthService,
    private CheckpointService: CheckpointService,
    private TodoService: TodoService,
    private RoadmapService: RoadmapService,
    private SkillsService: SkillsService,
  ) { }

  ngOnInit() {

    this.router.params.subscribe(params => {
      let userId = this.AuthService.userData().id;

      this.SkillsService.getAllSkills().subscribe( skills => {
        this.Skills = skills;
      });
    
      this.CheckpointService.discover(params.roadmap_id).subscribe(checkpoints => {
        this.DiscoverCheckpoints = checkpoints;
      })

      this.RoadmapService.getSingleRoadmap(params.roadmap_id).subscribe(roadmap=> {
        this.Roadmap = roadmap;
      })

      this.UserService.getUserRoadmapCheckpoints(params.roadmap_id, userId).subscribe(checkpoints => {
        this.Checkpoints = checkpoints;
        this.Checkpoints.sort(function(a, b){
          let current = a.user_checkpoints.index_number;
          let next = b.user_checkpoints.index_number;
          if(current > next){
            return 1;
          } else if(current < next) {
            return -1;
          } else{
            return 0;
          }
        })
        console.log(this.Checkpoints);
        this.Checkpoints[0].active = true;
        this.ActiveCheckpoint = this.Checkpoints[0];
        this.Todos = this.Checkpoints[0].todos;
      });

    })

  }

  toggleTodos(id:number) {
    for(let checkpoint of this.Checkpoints) {
      if(checkpoint.id == id) {
          checkpoint.active = true;
          this.Todos = checkpoint.todos;
          this.ActiveCheckpoint = checkpoint;
      } else {
        checkpoint.active = false;
      }
    }
  }


 openCreateCheckpointModal() {
   this.createCheckpointAction.emit({action:"modal",params:['open']});
 } 
 openSearchModal() {
  this.searchAction.emit({action:"modal",params:['open']})

 }

  openModal() {
    this.modalActions.emit({action:"modal",params:['open']});
  }
  closeModal() {
    this.modalActions.emit({action:"modal",params:['close']});
  }

  toggleDesc(item) {
    let classList = item.classList;
    if(classList.contains('hidden')) {
      classList.remove('hidden');
    } else {
      classList.add('hidden');
    }
  }

  createTodo(form:NgForm) {
    console.log(form.value);

    this.TodoService.create(this.Roadmap.id, this.ActiveCheckpoint.id, form.value).subscribe(res => {
      let Response:any = res;
      this.Todos.push(Response.todo);
    });
  }

  createCheckpoint(form:NgForm) {
    this.CheckpointService.create(this.Roadmap.id, form.value).subscribe(checkpoint => {
     this.Checkpoints.push(checkpoint)
    })
  }

  assignCheckpoint(id) {
    this.CheckpointService.assign(this.Roadmap.id, id).subscribe(checkpoint => {
        let Res:any = checkpoint;
        this.Checkpoints.push(Res.checkpoint);
        this.searchAction.emit({action:"modal",params:['close']})
    })
  }

  unAssignCheckpoint(id, index) {
    this.CheckpointService.unassign(this.Roadmap.id, id).subscribe(checkpoint => {
     console.log(checkpoint);
     let checkpoints:Array<any> = [];
     for(let checkpoint of this.Checkpoints) {
        if(checkpoint.id != id) {
          checkpoints.push(checkpoint);
        }
     }
     
      this.Checkpoints = checkpoints;
      this.toggleTodos(checkpoints[0].id);
    })
  }

  updateTodo(todo) {
    let checked = todo.users[0].user_todos.checked;

    if(checked == 0){
      this.TodoService.check(todo.id, {checked: 1}).subscribe(todo => {
          console.log(todo);
      })
    } else {
      this.TodoService.check(todo.id, {checked: 0}).subscribe(todo => {
        console.log(todo);
      })
    }
  }

  deleteTodo(id, index) {
    this.TodoService.unassign(id).subscribe(res => {
      let todos = [];
      for(let todo of this.Todos) {
        if(todo.id != id) {
          todos.push(todo);
        }
     }
     this.Todos = todos;
    })
  }

  dropDown($event) {
    let userCheckpoints = [];
    for(let i in this.Checkpoints) {
      let check = this.Checkpoints[i];

      this.Checkpoints[i].user_checkpoints.index_number = Number(i)+1;
      
      userCheckpoints.push(this.Checkpoints[i].user_checkpoints);
    }
    this.CheckpointService.updatePosition(this.Roadmap.id,{checkpoints:userCheckpoints}).subscribe(res => {
      console.log(res);
    })
  }

  searchCheckpoints(value) {
      this.CheckpointService.discover(this.Roadmap.id,value).subscribe(res => {
        this.DiscoverCheckpoints = res;
      })
  }
}
