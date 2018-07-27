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

  ngOnInit() {
    console.log(this.Data);
    for(let i = 0; i < this.Data.total/10; i++) {
      this.links.push({
        page: (i+1)
      })
    }
  }

  getData(event, page){
    event.preventDefault();
    this.next.emit({userId:this.Data.userId,page:page});
  }
}
