import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnInit, OnChanges {

  @Input() Data: any;
  @Output() next = new EventEmitter();
  links: Array<any> = [];
  CurrentPage: number;
  Total: number;
  PagesCount: number;
  constructor() { }

  ngOnChanges() {
   this.CurrentPage = 1;
   this.Total = this.Data.total;
   this.PagesCount = Math.ceil(this.Total / 10);
  }

  ngOnInit() {
    this.CurrentPage = 1;
    this.Total = this.Data.total;
    this.PagesCount = Math.ceil(this.Total / 10);
  }

  getData(page) {
    if (page > 0 && page <= this.PagesCount) {
      this.CurrentPage = page;
      if (this.Data.userId) {
        this.next.emit({userId: this.Data.userId, page: page});
      } else {
        this.next.emit({page: page});
      }
    }
  }
}
