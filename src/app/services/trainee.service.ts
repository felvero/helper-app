import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TraineeResponse } from '../types/traineeResponse';
import { Observable, catchError, throwError } from 'rxjs';
import { Trainee } from '../types/trainee';
import { LocalstorageService } from './localstorage.service';
import { Exercise } from '../types/exercise';
import { TrainerResponse } from '../types/trainerResponse';

@Injectable({
  providedIn: 'root'
})
export class TraineeService {

  private url: string = "https://localhost:443/api/trainees"
  trainees!: Trainee[];
  exercises: any = [];

constructor(
  private http: HttpClient,
  private localStorage: LocalstorageService
  ) {}

  getTraineesByTrainerId(trainerId: number, token?: string): Observable<TraineeResponse>{
    if (token) {
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      });
      return this.http.get<TraineeResponse>(`${this.url}/trainee/${trainerId}`, { headers: headers });
    } else {
      return this.http.get<TraineeResponse>(this.url); //403 - Forbidden
    }
}

  getTrainees(token?: string): Observable<TraineeResponse>{
    if (token) {
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      });
      return this.http.get<TraineeResponse>(this.url, { headers: headers });
    } else {
      return this.http.get<TraineeResponse>(this.url); //403 - Forbidden
    }
  }

  getTraineeDetails(traineeId: number, token?: string): Observable<any>{
    if (token) {
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      });
      return this.http.get<TraineeResponse>(`${this.url}`+"/"+traineeId, { headers: headers });
    } else {
      return this.http.get<TraineeResponse>(this.url); //403 - Forbidden
    }
  }

  updateTrainee(id: number, trainee: Trainee, token?: string): Observable<Object> {
    if (token) {
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      });
      return this.http.put<TraineeResponse>(`${this.url}/${id}`, trainee, { headers: headers });
    } else {
      return this.http.get<TraineeResponse>(this.url); //403 - Forbidden
    }
  }

  getTrainerNameByTraineeId(traineeId: number, token?: string): Observable<any> {
    if (token) {
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      });
    return this.http.get(`${this.url}/trainer-name/${traineeId}`, { responseType: 'text' });
  } else {
    return this.http.get(this.url); //403 - Forbidden
  }
}

assignTrainerToTrainee(traineeId: number, trainerId: number, token?: string): Observable<Trainee> {
  let headers = new HttpHeaders({
    'Content-Type': 'application/json',
  });

  if (token) {
    headers = headers.set('Authorization', `Bearer ${token}`);
  }

  return this.http.post<Trainee>(`${this.url}/trainee/${traineeId}/assign-trainer/${trainerId}`, {}, { headers })
    .pipe(
      catchError(this.handleError)
    );
}


private handleError(error: HttpErrorResponse) {
  let errorMessage = 'An unknown error occurred!';
  if (error.error instanceof ErrorEvent) {
    errorMessage = `Error: ${error.error.message}`;
  } else {
    errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
  }
  return throwError(errorMessage);
}

}
