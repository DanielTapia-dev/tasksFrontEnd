import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Inject, Input, Output } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialogModule,
} from '@angular/material/dialog';
import { Task } from '../../interfaces/task.interface';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-create-task-modal',
  standalone: true,
  templateUrl: './create-task-modal.component.html',
  styleUrls: ['./create-task-modal.component.scss'],
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    ReactiveFormsModule,
  ],
})
export class CreateTaskModalComponent {
  @Input() title: string = 'Crear Nueva Tarea';
  @Output() closeModal = new EventEmitter<void>();

  taskForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private taskService: TaskService,
    public dialogRef: MatDialogRef<CreateTaskModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.taskForm = this.fb.group({
      title: [
        data.task?.title || '',
        [Validators.required, Validators.minLength(3)],
      ],
      description: [
        data.task?.description || '',
        [Validators.required, Validators.minLength(5)],
      ],
      status: [data.task?.status || 'Pendiente', [Validators.required]],
      userEmail: localStorage.getItem('userEmail'),
    });
  }

  close(): void {
    this.dialogRef.close();
    this.closeModal.emit();
  }

  createOrUpdateTask(): void {
    if (this.taskForm.valid) {
      const taskData: Task = {
        ...this.taskForm.value,
      };

      if (this.data.task) {
        this.taskService.update(taskData, this.data.task.id).subscribe(
          (response) => {
            console.log('Tarea actualizada con éxito:', response);
            this.dialogRef.close(response);
          },
          (error) => {
            console.error('Error al actualizar la tarea:', error);
          }
        );
      } else {
        this.taskService.create(taskData).subscribe(
          (response) => {
            console.log('Tarea creada con éxito:', response);
            this.dialogRef.close(response);
          },
          (error) => {
            console.error('Error al crear la tarea:', error);
          }
        );
      }
    } else {
      this.taskForm.markAllAsTouched();
    }
  }
}
