import { TestBed } from '@angular/core/testing';

import { SnomedService } from './snomed.service';

describe('SnomedService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SnomedService = TestBed.get(SnomedService);
    expect(service).toBeTruthy();
  });
});
