import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { TaskService } from '../../services/task.service';
import { Task } from '../../interfaces/task.interface';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { HeaderComponent } from '../../shared/header.component.ts/header.component';
import { SidebarComponent } from '../../shared/sidebar.component.ts/sidebar.component';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss'],
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    HeaderComponent,
    SidebarComponent,
  ],
})
export class AdminDashboardComponent implements OnInit {
  displayedColumns: string[] = [
    'id',
    'title',
    'description',
    'status',
    'actions',
  ];
  dataSource: MatTableDataSource<Task> = new MatTableDataSource<Task>();
  isLeftSidebarOpen: boolean = false;

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.loadTasks();
  }

  toggleLeftSidebar() {
    this.isLeftSidebarOpen = !this.isLeftSidebarOpen;
  }

  loadTasks(): void {
    this.taskService.getAll().subscribe(
      (tasks: Task[]) => {
        this.dataSource.data = tasks;
      },
      (error) => {
        console.error('Error al cargar las tareas:', error);
      }
    );
  }
}
