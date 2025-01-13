import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { TaskCardComponent } from '../../shared/card-task/task-card.component';
import {
  MatFormField,
  MatLabel,
  MatPrefix,
} from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    MatButton,
    TaskCardComponent,
    MatFormField,
    MatLabel,
    MatIconModule,
    MatInputModule,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  constructor() {}

  tasks = [
    {
      title: 'Task 1',
      description: 'This is the first task',
      status: 'Pending',
      creationDate: new Date(),
    },
    {
      title: 'Task 2',
      description: 'This is the second task',
      status: 'In Progress',
      creationDate: new Date(),
    },
    {
      title: 'Task 3',
      description: 'This is the third task',
      status: 'Done',
      creationDate: new Date(),
    },
    {
      title: 'Task 1',
      description: 'This is the first task',
      status: 'Pending',
      creationDate: new Date(),
    },
    {
      title: 'Task 2',
      description: 'This is the second task',
      status: 'In Progress',
      creationDate: new Date(),
    },
    {
      title: 'Task 3',
      description: 'This is the third task',
      status: 'Done',
      creationDate: new Date(),
    },
  ];

  viewMode: 'grid' | 'list' = 'grid';

  setViewMode(mode: 'grid' | 'list') {
    this.viewMode = mode;
  }
}
