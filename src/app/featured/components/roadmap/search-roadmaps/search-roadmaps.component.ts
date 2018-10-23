import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { RoadmapService } from '../../../../core/services/roadmap.service';
import { Masonry, MasonryGridItem } from 'ng-masonry-grid'; 
import { CategoryService } from '../../../../core/services/catgory.service';
import { AuthService } from '../../../../core/services/auth.service';

@Component({
  selector: 'app-search-roadmaps',
  templateUrl: './search-roadmaps.component.html',
  styleUrls: ['./search-roadmaps.component.css']
})
export class SearchRoadmapsComponent implements OnInit {

  @Input() SearchRoadmaps:any;
  @Output() loadmoreAction = new EventEmitter();
  @Output() assignAction = new EventEmitter();



  Categories:any;
  _masonry: Masonry;
  @Input() filters:any = {
    name: null,
    category: null,
    offset: null
  };
  constructor(
    private RoadmapService: RoadmapService,
    private CategoryService: CategoryService
  ) { }

  ngOnInit() {
  
  }

  onNgMasonryInit($event: Masonry) {
    console.log($event); 
    this._masonry = $event; 
  }
   
  // Append items to NgMasonryGrid
  appendItems() {
    if (this._masonry) { // Check if Masonry instance exists
      this._masonry.setAddStatus('append'); // set status to 'append'
      this.SearchRoadmaps.push(); // some grid items: items
    }
  }
   
  // Prepend grid items to NgMasonryGrid
  prependItems() {
    if (this._masonry) {
      // set status to 'prepend' before adding items to NgMasonryGrid otherwise default: 'append' will applied
      this._masonry.setAddStatus('prepend');
      this.SearchRoadmaps.splice(0, 0);
    }
  }
   
  // Add items to NgMasonryGrid
  addItems(item) {  

    this._masonry.setAddStatus('add'); // set status to 'add'
    this.SearchRoadmaps.push(item);
  }
   
  // Remove selected item from NgMasonryGrid, For example, (click)="removeItem($event)" event binding on grid item
  // Note: 'id' on ng-masonry-grid is required to remove actual item from the list
  removeItem($event: any) {
    if (this._masonry) {
      this._masonry.removeItem($event.currentTarget)  // removeItem() expects actual DOM (ng-masonry-grid-item element)
          .subscribe((item: MasonryGridItem) => { // item: removed grid item DOM from NgMasonryGrid
            if (item) {
              let id = item.element.getAttribute('id'); // Get id attribute and then find index 
              let index = id.split('-')[2];
              // remove grid item from Masonry binding using index (because actual Masonry items order is different from this.masonryItems items) 
              this.SearchRoadmaps.splice(index, 1); 
            }
          });
    }
  }
   
  // Remove first item from NgMasonryGrid
  removeFirstItem() {
    if (this._masonry) {
      this._masonry.removeFirstItem()
          .subscribe( (item: MasonryGridItem) => {
            if (item) {
              let id = item.element.getAttribute('id');
              let index = id.split('-')[2];
              this.SearchRoadmaps.splice(index, 1);
            }
          });
    }
  }
   
  // Remove all items from NgMasonryGrid
  removeAllItems() {
    if (this._masonry) {
      this._masonry.removeAllItems()
          .subscribe( (items: MasonryGridItem) => {
              // remove all items from the list
              this.SearchRoadmaps = [];
          });
    }
  }
  
  assign(id, index) {
    this.assignAction.emit({id, roadmap: this.SearchRoadmaps[index]});
  }


  loadmore() {
    this.loadmoreAction.emit({
      name: this.filters.name,
      category: this.filters.category,
      length:  this.SearchRoadmaps.length
    });
  }
}
