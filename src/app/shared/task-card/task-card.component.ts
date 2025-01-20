import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatCard, MatCardContent } from '@angular/material/card';
import { MatOption } from '@angular/material/core';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { Task } from '../../interfaces/task.interface';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-task-card',
  standalone: true,
  imports: [
    CommonModule,
    MatCard,
    MatCardContent,
    MatFormField,
    MatLabel,
    MatSelectModule,
    MatOption,
    MatIconModule,
  ],
  templateUrl: './task-card.component.html',
  styleUrl: './task-card.component.scss',
})
export class TaskCardComponent {
  @Input() task: Task = {
    id: '',
    title: '',
    description: '',
    status: '',
    userEmail: '',
    creationDate: { seconds: 0, nanoseconds: 0 },
  };
  @Output() statusChanged = new EventEmitter<string>();
  @Output() showTaskForm = new EventEmitter<string>();
  @Output() showTaskToUpdateForm = new EventEmitter<Task>();

  updateTask(status: string) {
    this.statusChanged.emit(status);
  }

  updateAllTask(status: string) {
    this.showTaskForm.emit(status);
  }

  updateDataTask() {
    this.showTaskToUpdateForm.emit(this.task);
  }
}
