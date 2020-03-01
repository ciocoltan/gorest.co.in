import { TestBed } from '@angular/core/testing';

import { ApiServicesService } from './api-services.service';

describe('ApiServicesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ApiServicesService = TestBed.get(ApiServicesService);
    expect(service).toBeTruthy();
  });
});
