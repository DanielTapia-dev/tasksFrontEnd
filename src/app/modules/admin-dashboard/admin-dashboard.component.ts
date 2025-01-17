import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { TaskService } from '../../services/task.service';
import { Task } from '../../interfaces/task.interface';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss'],
  imports: [CommonModule, MatTableModule, MatButtonModule],
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

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.loadTasks();
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

  deleteTask(taskId: string): void {
    /*  this.taskService.update(taskId).subscribe(
      () => {
        console.log(`Tarea con ID ${taskId} eliminada.`);
        this.loadTasks(); // Recargar tareas después de eliminar
      },
      (error) => {
        console.error('Error al eliminar la tarea:', error);
      }
    ); */
  }
}
