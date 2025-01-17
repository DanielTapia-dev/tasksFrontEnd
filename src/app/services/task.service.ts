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

  getAll() {
    return this.http.get<Task[]>(this.baseUrl);
  }

  getAllActive() {
    return this.http.get<Task[]>(`${this.baseUrl}active`);
  }

  getAllByUser(email: string) {
    return this.http.get<Task[]>(`${this.baseUrl}${email}`);
  }

  create(task: Task) {
    return this.http.post<Task>(this.baseUrl, task);
  }

  update(task: Task, id: string) {
    return this.http.put<Task>(`${this.baseUrl}${id}`, task);
  }
}
