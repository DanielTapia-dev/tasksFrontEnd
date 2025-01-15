import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { TaskCardComponent } from '../../shared/card-task/task-card.component';
import { MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import { TaskService } from '../../services/task.service';
import { Task } from '../../interfaces/task.interface';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    TaskCardComponent,
    MatLabel,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  constructor(private router: Router, private taskService: TaskService) {}

  ngOnInit(): void {
    this.loadTasks();
  }

  tasks: Task[] = [];

  viewMode: 'grid' | 'list' = 'grid';
  isLeftSidebarOpen: boolean = false;

  setViewMode(mode: 'grid' | 'list') {
    this.viewMode = mode;
  }

  toggleLeftSidebar() {
    this.isLeftSidebarOpen = !this.isLeftSidebarOpen;
  }

  logout() {
    this.router.navigate(['./login']);
  }

  loadTasks() {
    this.taskService.getAllTasks().subscribe((resp) => {
      this.tasks = resp;
    });
  }
}
