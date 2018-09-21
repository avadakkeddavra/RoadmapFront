import { Component, OnInit, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../../../core/services/user.service';
import { CheckpointService } from '../../../core/services/checkpoint.service';
import { TodoService } from '../../../core/services/todo.service';
import { RoadmapService } from '../../../core/services/roadmap.service';
import { AuthService } from '../../../core/services/auth.service';
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
  Roadmap:number;
  modalActions = new EventEmitter<string|MaterializeAction>();
  ActiveCheckpoint:any;

  constructor(
    private router: ActivatedRoute,
    private UserService: UserService,
    private AuthService: AuthService,
    private CheckpointService: CheckpointService,
    private TodoService: TodoService,
    private RoadmapService: RoadmapService
  ) { }

  ngOnInit() {

    this.router.params.subscribe(params => {
      let userId = this.AuthService.userData().id;
      this.Roadmap = params.roadmap_id;

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

    this.TodoService.create(this.Roadmap, this.ActiveCheckpoint.id, form.value).subscribe(res => {
      let Response:any = res;
      this.Todos.push(Response.todo);
    });
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
      this.Todos.splice(1,index-1);
      console.log(this.Todos);
    })
  }
}
