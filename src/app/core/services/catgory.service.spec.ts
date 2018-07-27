import { TestBed, inject } from '@angular/core/testing';

import { CatgoryService } from './catgory.service';

describe('CatgoryService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CatgoryService]
    });
  });

  it('should be created', inject([CatgoryService], (service: CatgoryService) => {
    expect(service).toBeTruthy();
  }));
});
