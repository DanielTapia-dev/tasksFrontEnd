import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { UserResponse } from '../interfaces/auth-response.interface';
import { User } from '../interfaces/auth.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  private baseUrl = `${environment.apiUrl}user/`;

  getUser(userEmail: string) {
    const url = `${this.baseUrl}${userEmail}`;
    return this.http.get<UserResponse>(url);
  }

  createUser(user: User) {
    return this.http.post<User>(this.baseUrl, user);
  }
}
