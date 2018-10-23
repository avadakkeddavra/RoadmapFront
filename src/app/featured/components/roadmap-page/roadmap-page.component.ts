import { Component, OnInit, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../../../core/services/user.service';
import { CheckpointService } from '../../../core/services/checkpoint.service';
import { TodoService } from '../../../core/services/todo.service';
import { RoadmapService } from '../../../core/services/roadmap.service';
import { AuthService } from '../../../core/services/auth.service';
import { SkillsService } from '../../../core/services/skills.service';

import { MaterializeAction, toast } from 'angular2-materialize';
import { NgForm } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-roadmap-page',
  templateUrl: './roadmap-page.component.html',
  styleUrls: ['./roadmap-page.component.css']
}) 
export class RoadmapPageComponent implements OnInit {

  Checkpoints:any;
  Todos:any = []; 
  Roadmap:any;
  modalActions = new EventEmitter<string|MaterializeAction>();
  searchAction = new EventEmitter<string|MaterializeAction>();
  createCheckpointAction = new EventEmitter<string|MaterializeAction>();
  BooleanAction = new EventEmitter<string|MaterializeAction>();
  Deleting:any;

  Assigned:Boolean = false;
  ActiveCheckpoint:any;
  DiscoverCheckpoints: any;
  Skills:any = [];


  constructor(
    private router: ActivatedRoute,
    private _Router: Router,
    private UserService: UserService,
    private AuthService: AuthService,
    private CheckpointService: CheckpointService,
    private TodoService: TodoService,
    private RoadmapService: RoadmapService,
    private SkillsService: SkillsService,
    private  sanitize: DomSanitizer
  ) { }

 ngOnInit() {

    this.router.params.subscribe( async params => {
      let userId = this.AuthService.userData().id;

      await this.RoadmapService.getSingleRoadmap(params.roadmap_id).subscribe(roadmap=> {
          this.Roadmap = roadmap;
          this.Assigned = this.Roadmap.assigned;
          if(this.Roadmap.creator_id !== userId) {
              this.Roadmap.forked = true;
          }

          console.log(this.Roadmap);
      })

      this.SkillsService.getAllSkills().subscribe( skills => {
          let Skills:any = skills;
          console.log(skills);
          for(let item of Skills) {
            if(item.id == this.Roadmap.category_id) {
              this.Skills.push(item);
            }
          }
          console.log(this.Skills);
      });
    
      this.CheckpointService.discover(params.roadmap_id).subscribe(checkpoints => {
        this.DiscoverCheckpoints = checkpoints;
      })

      

      this.UserService.getUserRoadmapCheckpoints(params.roadmap_id, userId).subscribe(checkpoints => {
        this.Checkpoints = checkpoints;

        if(this.Checkpoints.length > 0) {
          this.Checkpoints.map( (item) => {
            if(this.AuthService.userData().id == item.creator_id) {
                item.canEdit = true
            } else{
              item.canEdit = false;
            }
          })
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
        }

      }, error => {
        this.Checkpoints = [];
      });

    })

  }

  toggleTodos(id:number) {
    for(let checkpoint of this.Checkpoints) {
      if(checkpoint.id == id) {
          checkpoint.active = true;
          this.Todos = checkpoint.todos;
          this.ActiveCheckpoint = {};
          this.ActiveCheckpoint = checkpoint;
      } else {
        checkpoint.active = false;
      }
    }
    console.log(this.ActiveCheckpoint)
  }


 openCreateCheckpointModal() {
   this.createCheckpointAction.emit({action:"modal",params:['open']});
 } 
 openSearchModal() {
  this.CheckpointService.discover(this.Roadmap.id).subscribe(checkpoints => {
    this.DiscoverCheckpoints = checkpoints;
  })
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
    this.closeModal();
  }

  createCheckpoint(form:NgForm) {
    this.CheckpointService.create(this.Roadmap.id, form.value).subscribe(checkpoint => {
      checkpoint['active'] = true;
      
      if(this.ActiveCheckpoint) {
        this.ActiveCheckpoint.active = false; 
      }

      this.ActiveCheckpoint = {};
      this.ActiveCheckpoint = checkpoint; 
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
  
  showDeleteChoose(id, index) {
      this.Deleting = {
        id: id,
        idnex: index
     }
    this.BooleanAction.emit({action:'modal', params:['open']});
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
      this.DiscoverCheckpoints[index].assigned = false;
      this.Checkpoints = checkpoints;
      this.toggleTodos(checkpoints[0].id);
      this.Deleting = {};
    })
  }
  
  forceDeleteCheckpoint(id, index) {
    this.CheckpointService.force(this.Roadmap.id, id).subscribe(checkpoint => {
      console.log(checkpoint);
      let checkpoints:Array<any> = [];
      for(let checkpoint of this.Checkpoints) {
         if(checkpoint.id != id) {
           checkpoints.push(checkpoint);
         }
      }
      
       this.Checkpoints = checkpoints;
       this.toggleTodos(checkpoints[0].id);
       this.Deleting = {}
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


  updateContentTodo(type, content, id) {
    let body = {};
    body[type] = content;
    console.log(body);
  }
  

  merge(id, index) {
    this.CheckpointService.merge(this.Roadmap.id, id).subscribe(res => {
      this.Checkpoints.push(res);
      this.searchAction.emit({action:"modal",params:['close']});
      this.DiscoverCheckpoints[index].assigned = true;
    })
  }
}
