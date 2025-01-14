import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environments';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  private baseUrl = `${environment.apiUrl}user/`;

  getUser(userEmail: string) {
    const url = `${this.baseUrl}${userEmail}`;
    return this.http.get(url);
  }
}
