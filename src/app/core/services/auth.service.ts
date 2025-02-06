import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { isPlatformBrowser } from '@angular/common';

interface User {
  id?: string;
  email: string;
  firstName?: string;
  lastName?: string;
  token?: string;
}

interface LoginCredentials {
  email: string;
  password: string;
}

interface RegisterData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  country: string;
}

export interface RegisterResponse {
  email: string;
  message: string;
}

export interface EmailVerificationRequest {
  email: string;
  token: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<User | null>;
  public currentUser: Observable<User | null>;

  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.currentUserSubject = new BehaviorSubject<User | null>(this.getCurrentUser());
    this.currentUser = this.currentUserSubject.asObservable();
  }

  private getCurrentUser(): User | null {
    if (isPlatformBrowser(this.platformId)) {
      const userJson = localStorage.getItem(environment.auth.userKey);
      return userJson ? JSON.parse(userJson) : null;
    }
    return null;
  }

  public get currentUserValue(): User | null {
    return this.currentUserSubject.value;
  }

  login(credentials: LoginCredentials): Observable<User> {
    return this.http
      .post<User>(`${environment.apiUrl}/login`, credentials)
      .pipe(
        map((user) => {
          this.setLocalUser(user);
          this.currentUserSubject.next(user);
          return user;
        }),
        catchError((error) => {
          console.error('Login error:', error);
          throw error;
        })
      );
  }

  logout(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.clearLocalUser();
    }
    this.currentUserSubject.next(null);
  }

  register(userData: RegisterData): Observable<RegisterResponse> {
    const url = `${environment.apis.digicoffer.baseUrl}${environment.apis.digicoffer.endpoints.register}`;
    return this.http.post<RegisterResponse>(url, userData);
  }

  verifyEmailToken(verificationData: EmailVerificationRequest): Observable<any> {
    const url = `${environment.apis.digicoffer.baseUrl}${environment.apis.digicoffer.endpoints.emailVerification.verifyToken}`;
    return this.http.post(url, verificationData);
  }

  resendEmailVerificationToken(email: string): Observable<any> {
    const url = `${environment.apis.digicoffer.baseUrl}${environment.apis.digicoffer.endpoints.emailVerification.resendToken}`;
    return this.http.post(url, { email });
  }

  requestPasswordReset(email: string): Observable<any> {
    return this.http.post(`${environment.apiUrl}/forgot/email`, { email });
  }

  resetPassword(token: string, newPassword: string): Observable<any> {
    const url = `${environment.apiUrl}/forgot/email/token/verify`;
    return this.http.post(url, { token, newPassword });
  }

  isLoggedIn(): boolean {
    return !!this.currentUserValue;
  }

  getAuthToken(): string | null {
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem(environment.auth.tokenKey);
    }
    return null;
  }

  private setLocalUser(user: User): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem(environment.auth.userKey, JSON.stringify(user));
      localStorage.setItem(environment.auth.tokenKey, user.token || '');
    }
  }

  private clearLocalUser(): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem(environment.auth.userKey);
      localStorage.removeItem(environment.auth.tokenKey);
    }
  }
}
