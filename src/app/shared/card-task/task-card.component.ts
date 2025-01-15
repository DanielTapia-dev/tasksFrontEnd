import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatCard, MatCardContent } from '@angular/material/card';
import { MatOption } from '@angular/material/core';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Task } from '../../interfaces/task.interface';

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
  ],
  templateUrl: './task-card.component.html',
  styleUrl: './task-card.component.scss',
})
export class TaskCardComponent {
  @Input() title: string = '';
  @Input() description: string = '';
  @Input() status: string = '';
  @Input() creationDate: {
    seconds: number;
    nanoseconds: number;
  } = { seconds: 0, nanoseconds: 0 };
  @Output() statusChanged = new EventEmitter<string>();

  statuses = ['Pending', 'In Progress', 'Done'];

  changeStatus(newStatus: string) {
    this.statusChanged.emit(newStatus);
  }

  onStatusChange(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    this.changeStatus(selectElement.value);
  }
}
