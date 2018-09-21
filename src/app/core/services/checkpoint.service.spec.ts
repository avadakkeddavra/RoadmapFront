import { TestBed, inject } from '@angular/core/testing';

import { CheckpointService } from './checkpoint.service';

describe('CheckpointService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CheckpointService]
    });
  });

  it('should be created', inject([CheckpointService], (service: CheckpointService) => {
    expect(service).toBeTruthy();
  }));
});
