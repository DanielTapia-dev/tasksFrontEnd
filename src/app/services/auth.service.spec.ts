import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthService],
    });

    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch user data', () => {
    const mockUserResponse = { exists: true, message: 'Usuario ya existente.' };
    const userEmail = 'john@example.com';

    service.getUser(userEmail).subscribe((user) => {
      expect(user).toEqual(mockUserResponse);
    });

    const req = httpMock.expectOne(`${service['baseUrl']}${userEmail}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockUserResponse);
  });
});
