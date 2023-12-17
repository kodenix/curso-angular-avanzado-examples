import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { existTokenGuard } from './exist-token.guard';

describe('existTokenGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => existTokenGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
