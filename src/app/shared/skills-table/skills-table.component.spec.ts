import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SkillsTableComponent } from './skills-table.component';

describe('SkillsTableComponent', () => {
  let component: SkillsTableComponent;
  let fixture: ComponentFixture<SkillsTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SkillsTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SkillsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
