import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { AuthGuard } from './auth.guard';

describe('AuthGuard', () => {
  let guard: AuthGuard;
  let mockRouter: jasmine.SpyObj<Router>;

  beforeEach(() => {
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      providers: [AuthGuard, { provide: Router, useValue: mockRouter }],
    });

    guard = TestBed.inject(AuthGuard);
  });

  it('should allow access when userEmail exists', () => {
    spyOn(localStorage, 'getItem').and.returnValue('test@example.com');

    const result = guard.canActivate();
    expect(result).toBeTrue();
  });

  it('should block access and navigate to login when userEmail does not exist', () => {
    spyOn(localStorage, 'getItem').and.returnValue(null);

    const result = guard.canActivate();
    expect(result).toBeFalse();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/login']);
  });
});
