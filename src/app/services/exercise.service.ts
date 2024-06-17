import { Injectable } from '@angular/core';
import { Exercise } from '../types/exercise';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ExerciseResponse } from '../types/exerciseResponse';
import { LocalstorageService } from './localstorage.service';

@Injectable({
  providedIn: 'root'
})
export class ExerciseService {

  private url: string = "https://localhost:443/api/exercises"
  private urlError: string = "http://localhost:4200/error"
  exercises!: Exercise[];
  
  constructor(
    private http: HttpClient,
    private localStorage: LocalstorageService
    ) {}

    getExercisesByTrainerId(trainerId: number, token?: string, role?:string) : Observable<ExerciseResponse>{
      if (token) {
        const headers = new HttpHeaders({
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        });
        return this.http.get<ExerciseResponse>(`${this.url}/trainer/${trainerId}`, { headers: headers });
      } else {
        return this.http.get<ExerciseResponse>(this.urlError); //403 - Forbidden
      }
  }

    getExercisesByTraineeId(traineeId: number, token?: string, role?:string) : Observable<ExerciseResponse>{
      if (token) {
        const headers = new HttpHeaders({
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        });
        return this.http.get<ExerciseResponse>(`${this.url}/trainee/${traineeId}`, { headers: headers });
      } else {
        return this.http.get<ExerciseResponse>(this.urlError); //403 - Forbidden
      }
}

  createExercise(exercise?: Exercise, token?: string){
    if (token) {
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      });
    
      console.log("test");
      
      return this.http.post<ExerciseResponse>(this.url + "/addToTrainee" , undefined, { headers: headers });
    } else {
      return this.http.get<ExerciseResponse>(this.urlError); //403 - Forbidden
  }
}



  getExercises(token?: string): Observable<ExerciseResponse>{
    if (token) {
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      });
      return this.http.get<ExerciseResponse>(this.url, { headers: headers });
    } else {
      return this.http.get<ExerciseResponse>(this.urlError); //403 - Forbidden
    }
  }

  getExerciseDetails(exerciseId: number, token?: string): Observable<any>{
    if (token) {
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      });
      return this.http.get<ExerciseResponse>(`${this.url}/${exerciseId}`, { headers: headers });
    } else {
      return this.http.get<ExerciseResponse>(this.urlError); //403 - Forbidden
    }
  }

  updateExercise(id: number, exercise: Exercise, token?: string): Observable<Object> {
    if (token) {
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      });
      return this.http.put<ExerciseResponse>(`${this.url}/${id}`, exercise, { headers: headers });
    } else {
      return this.http.get<ExerciseResponse>(this.urlError); //403 - Forbidden
    }
  }

  deleteExercise(exerciseId: number, token?: string): Observable<any>{
    if (token) {
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      });
      return this.http.delete<ExerciseResponse>(`${this.url}/${exerciseId}`, { headers: headers });
    } else {
      return this.http.get<ExerciseResponse>(this.urlError); //403 - Forbidden
    }
  }

}




