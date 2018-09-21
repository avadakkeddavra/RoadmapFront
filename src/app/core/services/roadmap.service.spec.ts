import { TestBed, inject } from '@angular/core/testing';

import { RoadmapService } from './roadmap.service';

describe('RoadmapService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RoadmapService]
    });
  });

  it('should be created', inject([RoadmapService], (service: RoadmapService) => {
    expect(service).toBeTruthy();
  }));
});
