import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnInit, OnChanges {

  @Input() Data:any;
  @Output() next = new EventEmitter();
  links:Array<any> = [];

  constructor() { }

  ngOnChanges() {

   this.links = [];
    for(let i = 0; i < Math.round(this.Data.total/10); i++) {
      this.links.push({
        page: (i+1),
        highlighted: false
      });
    }
    if(this.links.length > 0) {
      this.links[0].highlighted = true;
    }
  }

  ngOnInit() {
    this.links = [];
    for(let i = 0; i < Math.round(this.Data.total/10); i++) {
      this.links.push({
        page: (i+1),
        highlighted: false
      })
    }
    if(this.links.length > 0) {
      this.links[0].highlighted = true;
    }
  }

  getData(event, item, page){

    for(let page of this.links) {
      page.highlighted = false;
    }
    item.highlighted = true;

    event.preventDefault();
    this.next.emit({userId:this.Data.userId,page:page});
  }
}
