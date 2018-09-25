import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchRoadmapsComponent } from './search-roadmaps.component';

describe('SearchRoadmapsComponent', () => {
  let component: SearchRoadmapsComponent;
  let fixture: ComponentFixture<SearchRoadmapsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchRoadmapsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchRoadmapsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
