import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { of } from 'rxjs';

import { CreateTaskModalComponent } from './create-task-modal.component';
import { TaskService } from '../../services/task.service';

const mockTaskService = {
  create: jasmine.createSpy('create').and.returnValue(of({})),
  update: jasmine.createSpy('update').and.returnValue(of({})),
};

const mockDialogRef = {
  close: jasmine.createSpy('close'),
};

const mockDialogData = {
  task: {
    title: 'Mock Task',
    description: 'Mock Description',
    status: 'Pendiente',
  },
};

describe('CreateTaskModalComponent', () => {
  let component: CreateTaskModalComponent;
  let fixture: ComponentFixture<CreateTaskModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateTaskModalComponent, ReactiveFormsModule],
      providers: [
        { provide: TaskService, useValue: mockTaskService },
        { provide: MatDialogRef, useValue: mockDialogRef },
        { provide: MAT_DIALOG_DATA, useValue: mockDialogData },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CreateTaskModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
