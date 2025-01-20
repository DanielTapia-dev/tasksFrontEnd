import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { of } from 'rxjs';

import { AdminDashboardComponent } from './admin-dashboard.component';
import { TaskService } from '../../services/task.service';

const mockTaskService = {
  getAll: jasmine.createSpy('getAll').and.returnValue(of([])),
};

describe('AdminDashboardComponent', () => {
  let component: AdminDashboardComponent;
  let fixture: ComponentFixture<AdminDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        AdminDashboardComponent,
        MatTableModule,
        MatButtonModule,
        NoopAnimationsModule,
      ],
      providers: [{ provide: TaskService, useValue: mockTaskService }],
    }).compileComponents();

    fixture = TestBed.createComponent(AdminDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
