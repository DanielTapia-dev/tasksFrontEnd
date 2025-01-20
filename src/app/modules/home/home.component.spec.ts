import { TestBed, ComponentFixture } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Router } from '@angular/router';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { of } from 'rxjs';

import { HomeComponent } from './home.component';
import { TaskService } from '../../services/task.service';
import { AlertService } from '../../services/alert.service';

const mockRouter = {
  navigate: jasmine.createSpy('navigate'),
};

const mockMatDialog = {
  open: jasmine.createSpy('open').and.returnValue({
    afterClosed: () => of(true),
  }),
};

const mockTaskService = {
  getAllByUser: jasmine.createSpy('getAllByUser').and.returnValue(of([])),
  update: jasmine.createSpy('update').and.returnValue(of(null)),
};

const mockAlertService = {
  showSelection: jasmine
    .createSpy('showSelection')
    .and.returnValue(Promise.resolve(true)),
};

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeComponent, NoopAnimationsModule, MatDialogModule],
      providers: [
        { provide: Router, useValue: mockRouter },
        { provide: MatDialog, useValue: mockMatDialog },
        { provide: TaskService, useValue: mockTaskService },
        { provide: AlertService, useValue: mockAlertService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load tasks on initialization', () => {
    expect(mockTaskService.getAllByUser).toHaveBeenCalled();
    expect(component.tasks.length).toBe(0);
  });

  it('should navigate to login on logout', () => {
    component.logout();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['./login']);
  });
});
