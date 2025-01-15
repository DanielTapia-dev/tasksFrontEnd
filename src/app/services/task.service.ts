import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environments';
import { Task } from '../interfaces/task.interface';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  constructor(private http: HttpClient) {}

  private baseUrl = `${environment.apiUrl}task/`;

  getAllTasks() {
    return this.http.get<Task[]>(this.baseUrl);
  }

  createTask(task: Task) {
    return this.http.post<Task>(this.baseUrl, task);
  }
}
