import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoadmapStatComponent } from './roadmap-stat.component';

describe('RoadmapStatComponent', () => {
  let component: RoadmapStatComponent;
  let fixture: ComponentFixture<RoadmapStatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoadmapStatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoadmapStatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
