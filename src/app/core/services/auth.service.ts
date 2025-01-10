import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;

  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.currentUserSubject = new BehaviorSubject<any>(this.getCurrentUser());
    this.currentUser = this.currentUserSubject.asObservable();
  }

  private getCurrentUser(): any {
    if (isPlatformBrowser(this.platformId)) {
      return JSON.parse(localStorage.getItem('currentUser') || 'null');
    }
    return null;
  }

  public get currentUserValue(): any {
    return this.currentUserSubject.value;
  }

  login(credentials: { email: string; password: string }): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/auth/login`, credentials)
      .pipe(map(user => {
        if (isPlatformBrowser(this.platformId)) {
          localStorage.setItem('currentUser', JSON.stringify(user));
        }
        this.currentUserSubject.next(user);
        return user;
      }));
  }

  logout() {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('currentUser');
    }
    this.currentUserSubject.next(null);
  }
 

  register(user: any): Observable<any> {
    return this.http.post(`${environment.apiUrl}/auth/register`, user);
  }

  requestPasswordReset(email: string): Observable<any> {
    return this.http.post(`${environment.apiUrl}/auth/forgot-password`, { email });
  }

  resetPassword(token: string, newPassword: string): Observable<any> {
    return this.http.post(`${environment.apiUrl}/auth/reset-password`, { token, newPassword });
  }

  isLoggedIn(): boolean {
    return !!this.currentUserValue;
  }

  getAuthToken(): string | null {
    const currentUser = this.currentUserValue;
    return currentUser ? currentUser.token : null;
  }
}

