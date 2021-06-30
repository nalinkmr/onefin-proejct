import { TestBed } from '@angular/core/testing';

import { MovieDashboardService } from './movie-dashboard.service';

describe('MovieDashboardService', () => {
  let service: MovieDashboardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MovieDashboardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
