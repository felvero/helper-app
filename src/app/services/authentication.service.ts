import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const AUTH_API = 'https://localhost:443/api/auth/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  trainerLogin(email: string, password: string): Observable<any> {
    return this.http.post(
      AUTH_API + 'trainer-login',
      {
        email,
        password,
      },
      httpOptions
    );
  }

  traineeLogin(email: string, password: string): Observable<any> {
    return this.http.post(
      AUTH_API + 'trainee-login',
      {
        email,
        password,
      },
      httpOptions
    );
  }

  trainerRegister(firstName: string, lastName: string, email: string, password: string, phoneNumber: string, yearOfBirth: number, actualGym: string): Observable<any> {
    return this.http.post(
      AUTH_API + 'trainer-register',
      {
        firstName,
        lastName,
        email,
        password,
        phoneNumber,
        yearOfBirth,
        actualGym

      },
      httpOptions
    );
  }

  traineeRegister(firstName: string, lastName: string, email: string, password: string, phoneNumber: string, yearOfBirth: number, actualGym: string): Observable<any> {
    return this.http.post(
      AUTH_API + 'trainee-register',
      {
        firstName,
        lastName,
        email,
        password,
        phoneNumber,
        yearOfBirth,
        actualGym

      },
      httpOptions
    );
  }

  logout(): Observable<any> {
    return this.http.post(AUTH_API + 'signout', { }, httpOptions);
  }


  
}