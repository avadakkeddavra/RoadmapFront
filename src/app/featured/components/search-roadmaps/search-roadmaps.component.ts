import { Component, OnInit } from '@angular/core';
import { RoadmapService } from '../../../core/services/roadmap.service';
import { Masonry, MasonryGridItem } from 'ng-masonry-grid'; 
import { CategoryService } from '../../../core/services/catgory.service';

@Component({
  selector: 'app-search-roadmaps',
  templateUrl: './search-roadmaps.component.html',
  styleUrls: ['./search-roadmaps.component.css']
})
export class SearchRoadmapsComponent implements OnInit {

  Roadmaps:any;
  Categories:any;
  _masonry: Masonry;
  constructor(
    private RoadmapService: RoadmapService,
    private CategoryService: CategoryService
  ) { }

  ngOnInit() {
    this.RoadmapService.getAllRoadmaps().subscribe(roadmaps => {
      this.Roadmaps = roadmaps;
    });
    this.CategoryService.all().subscribe(categories => {
      let Response:any = categories;
      this.Categories = Response.data;
      console.log();
    })
  }

  search(name, category) {

   
    if(name.length > 0 || category.length > 0) {
      console.log(name);
      this.RoadmapService.search(name, category).subscribe(roadmaps => {
        this.Roadmaps = roadmaps;
        console.log(this.Roadmaps);
      })
    };
    
  }

  onNgMasonryInit($event: Masonry) {
    this._masonry = $event;
  }
   
  // Append items to NgMasonryGrid
  appendItems() {
    if (this._masonry) { // Check if Masonry instance exists
      this._masonry.setAddStatus('append'); // set status to 'append'
      this.Roadmaps.push(); // some grid items: items
    }
  }
   
  // Prepend grid items to NgMasonryGrid
  prependItems() {
    if (this._masonry) {
      // set status to 'prepend' before adding items to NgMasonryGrid otherwise default: 'append' will applied
      this._masonry.setAddStatus('prepend');
      this.Roadmaps.splice(0, 0);
    }
  }
   
  // Add items to NgMasonryGrid
  addItems() {  
    if (this._masonry) {
      this._masonry.setAddStatus('add'); // set status to 'add'
      this.Roadmaps.push();
    }
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
              this.Roadmaps.splice(index, 1); 
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
              this.Roadmaps.splice(index, 1);
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
              this.Roadmaps = [];
          });
    }
  }
   
  // reorder items to original position
  // Note: Add masonry option:- horizontalOrder: true
  reorderItems() {
    if (this._masonry) {
        this._masonry.reOrderItems();
    }
  }
}
