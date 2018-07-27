import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BestMatchedComponent } from './best-matched.component';

describe('BestMatchedComponent', () => {
  let component: BestMatchedComponent;
  let fixture: ComponentFixture<BestMatchedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BestMatchedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BestMatchedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
