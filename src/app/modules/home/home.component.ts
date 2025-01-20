import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { TaskService } from '../../services/task.service';
import { Task } from '../../interfaces/task.interface';
import { CreateTaskModalComponent } from '../../shared/create-task-modal/create-task-modal.component';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { HeaderComponent } from '../../shared/header.component.ts/header.component';
import { SidebarComponent } from '../../shared/sidebar.component.ts/sidebar.component';
import { TaskCardComponent } from '../../shared/task-card/task-card.component';
import { AlertService } from '../../services/alert.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatDialogModule,
    HeaderComponent,
    SidebarComponent,
    TaskCardComponent,
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  tasks: Task[] = [];
  viewMode: 'grid' | 'list' = 'grid';
  isLeftSidebarOpen: boolean = false;

  constructor(
    private router: Router,
    private dialog: MatDialog,
    private taskService: TaskService,
    private alertService: AlertService
  ) {}

  ngOnInit(): void {
    this.loadActiveTasks();
  }

  setViewMode(mode: 'grid' | 'list') {
    this.viewMode = mode;
  }

  toggleLeftSidebar() {
    this.isLeftSidebarOpen = !this.isLeftSidebarOpen;
  }

  openModal(task: Task | null = null): void {
    if (task != null) {
      const dialogRef = this.dialog.open(CreateTaskModalComponent, {
        width: '400px',
        data: {
          title: 'Editar Tarea',
          content: 'Complete los datos para crear una tarea.',
          task: task || null,
        },
      });

      dialogRef.afterClosed().subscribe((result) => {
        if (result) {
          this.loadActiveTasks();
        }
      });
    } else {
      const dialogRef = this.dialog.open(CreateTaskModalComponent, {
        width: '400px',
        data: {
          title: 'Crear Nueva Tarea',
          content: 'Complete los datos para crear una tarea.',
          task: task || null,
        },
      });

      dialogRef.afterClosed().subscribe((result) => {
        if (result) {
          this.loadActiveTasks();
        }
      });
    }
  }

  loadActiveTasks() {
    const email = localStorage.getItem('userEmail') || '';
    this.taskService.getAllByUser(email).subscribe(
      (tasks) => {
        this.tasks = tasks;
      },
      (error) => {
        console.error('Error al cargar las tareas:', error);
      }
    );
  }

  async onStatusChange(task: Task, newStatus: string) {
    if (newStatus === 'Eliminada') {
      const response = await this.alertService.showSelection(
        '¿Está seguro de borrar la tarea?',
        'Sí, eliminar',
        'Confirmación'
      );

      if (response) {
        task.status = newStatus;
        this.taskService.update(task, task.id).subscribe(() => {
          this.loadActiveTasks();
        });
      }
    } else {
      task.status = newStatus;
      this.taskService.update(task, task.id).subscribe(() => {
        this.loadActiveTasks();
      });
    }
  }

  async onDataChange(task: Task) {
    this.openModal(task);
  }

  logout() {
    this.router.navigate(['./login']);
  }
}
