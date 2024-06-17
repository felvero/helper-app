import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TrainerResponse } from '../types/trainerResponse';
import { Observable } from 'rxjs';
import { Trainer } from '../types/trainer';
import { LocalstorageService } from './localstorage.service';

@Injectable({
  providedIn: 'root'
})
export class TrainerService {

  private url: string = "https://localhost:443/api/trainers"
  trainers!: Trainer[];
  exercises: any = [];

  constructor(
    private http: HttpClient,
    private localStorage: LocalstorageService
    ) {}

  getTrainers(token?: string): Observable<TrainerResponse>{
    if (token) {
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      });
      return this.http.get<TrainerResponse>(this.url, { headers: headers });
    } else {
      return this.http.get<TrainerResponse>(this.url); //403 - Forbidden
    }
  }

  getTrainerDetails(trainerId: number, token?: string): Observable<any>{
    if (token) {
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      });
      console.log('step1');
      return this.http.get<TrainerResponse>(`${this.url}`+"/"+trainerId, { headers: headers });
    } else {
      return this.http.get<TrainerResponse>(this.url); //403 - Forbidden
    }
  }

  updateTrainer(id: number, trainer: Trainer, token?: string): Observable<Object> {
    if (token) {
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      });
      return this.http.put<TrainerResponse>(`${this.url}/${id}`, trainer, { headers: headers });
    } else {
      return this.http.get<TrainerResponse>(this.url); //403 - Forbidden
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

}