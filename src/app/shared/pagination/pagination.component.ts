import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnInit {

  @Input() Data:any;
  @Output() next = new EventEmitter();
  links:Array<any> = [];

  constructor() { }

  ngOnChanges() {
   this.links = [];
    for(let i = 0; i < Math.round(this.Data.total/10); i++) {
      this.links.push({
        page: (i+1)
      })
    }
  }

  ngOnInit() {}

  getData(event, page){
    event.preventDefault();
    this.next.emit({userId:this.Data.userId,page:page});
  }
}
