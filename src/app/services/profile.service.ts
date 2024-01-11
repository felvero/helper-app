import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LocalstorageService } from './localstorage.service';
import { Trainee } from '../types/trainee';
import { Trainer } from '../types/trainer';
import { TraineeResponse } from '../types/traineeResponse';
import { Observable } from 'rxjs';
import { TrainerResponse } from '../types/trainerResponse';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  private url: string = "https://localhost:443/api/"
  trainers!: Trainer[];
  trainees!: Trainee[];
  
  constructor(
    private http: HttpClient,
    private localStorage: LocalstorageService
    ) {}

    getTraineeDetails(user: {token: string, id: number}): Observable<any>{
      if (user.token) {
        const headers = new HttpHeaders({
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.token}`,
        });
        return this.http.get<TraineeResponse>(`${this.url}/trainees`+"/"+user.id, { headers: headers });
      } else {
        return this.http.get<TraineeResponse>(this.url); //403 - Forbidden
      }
    }

    getTrainerDetails(user: {token: string, id: number}): Observable<any>{
      if (user.token) {
        const headers = new HttpHeaders({
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.token}`,
        });
        return this.http.get<TrainerResponse>(`${this.url}/trainers`+"/"+user.id, { headers: headers });
      } else {
        return this.http.get<TrainerResponse>(this.url); //403 - Forbidden
      }
    }
}
