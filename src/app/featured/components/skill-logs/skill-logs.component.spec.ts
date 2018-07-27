import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SkillLogsComponent } from './skill-logs.component';

describe('SkillLogsComponent', () => {
  let component: SkillLogsComponent;
  let fixture: ComponentFixture<SkillLogsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SkillLogsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SkillLogsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
