import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { of } from 'rxjs';

import { AuthComponent } from './auth.component';
import { AuthService } from '../../services/auth.service';
import { AlertService } from '../../services/alert.service';

const mockRouter = {
  navigate: jasmine.createSpy('navigate'),
};

const mockAuthService = {
  getUser: jasmine.createSpy('getUser').and.returnValue(of({ exists: true })),
  createUser: jasmine.createSpy('createUser').and.returnValue(of(null)),
};

const mockAlertService = {
  showSuccess: jasmine.createSpy('showSuccess'),
  showError: jasmine.createSpy('showError'),
};

describe('AuthComponent', () => {
  let component: AuthComponent;
  let fixture: ComponentFixture<AuthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatCheckboxModule,
        MatIconModule,
        ReactiveFormsModule,
        NoopAnimationsModule,
      ],
      providers: [
        { provide: Router, useValue: mockRouter },
        { provide: AuthService, useValue: mockAuthService },
        { provide: AlertService, useValue: mockAlertService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AuthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the login form', () => {
    expect(component.loginForm).toBeDefined();
    expect(component.loginForm.controls['email']).toBeDefined();
  });

  it('should call AuthService.getUser when login is valid', () => {
    component.loginForm.controls['email'].setValue('test@example.com');
    component.login();
    expect(mockAuthService.getUser).toHaveBeenCalledWith('test@example.com');
  });

  it('should navigate to home after successful login', () => {
    component.loginForm.controls['email'].setValue('test@example.com');
    component.login();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['./home']);
  });
});
