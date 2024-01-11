import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TraineeResponse } from '../types/traineeResponse';
import { Observable } from 'rxjs';
import { Trainee } from '../types/trainee';
import { LocalstorageService } from './localstorage.service';
import { Exercise } from '../types/exercise';

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
      return this.http.get<TraineeResponse>(`${this.url}/traineesByTrainerId?trainerId=${trainerId}`, { headers: headers });
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

  getTrainesByTrainerId(trainerId: number,token?: string): Observable<TraineeResponse>{
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

  getTrainerByTraineeId(traineeId: number, token?: string): Observable<TraineeResponse>{
    if (token) {
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      });
      return this.http.get<TraineeResponse>(`${this.url}/trainerByTraineeId?traineeId=${traineeId}`, { headers: headers });
    } else {
      return this.http.get<TraineeResponse>(this.url); //403 - Forbidden
    }
}

}






  // getTraineeDetails(id:number): Observable<any>{
  //   return this.http.get<any>(this.url+"/"+id)
  // }

