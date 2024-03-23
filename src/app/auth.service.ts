import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  URL = 'http://localhost:3030/users';

  constructor(private http: HttpClient, private router: Router) {}

  checkSession() {
    const user = localStorage.getItem('user');
    if (user) {
      this.isAuthenticatedSubject.next(true);
    }
  }

  isLoggedIn(): Observable<boolean> {
    return this.isAuthenticatedSubject.asObservable();
  }

  login(email: string, password: string): Observable<any> {
    const body = { email, password };
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http
      .post<any>(`${this.URL}/login`, body, { headers })
      .pipe(tap(() => this.isAuthenticatedSubject.next(true)));
  }

  register(email: string, username: string, password: string): Observable<any> {
    const body = { email, username, password };
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http
      .post<any>(`${this.URL}/register`, body, { headers })
      .pipe(tap(() => this.isAuthenticatedSubject.next(true)));
  }

  logout() {
    localStorage.removeItem('user');

    this.isAuthenticatedSubject.next(false);
    this.router.navigate(['/']);
  }
}
