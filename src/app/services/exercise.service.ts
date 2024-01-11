import { Injectable } from '@angular/core';
import { Exercise } from '../types/exercise';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ExerciseResponse } from '../types/exerciseResponse';
import { LocalstorageService } from './localstorage.service';
import { Trainer } from '../types/trainer';
import { TraineeResponse } from '../types/traineeResponse';

@Injectable({
  providedIn: 'root'
})
export class ExerciseService {

  private url: string = "https://localhost:443/api/exercises"
  private url2: string = "https://localhost:443/api/trainees"
  exercises!: Exercise[];
  
  constructor(
    private http: HttpClient,
    private localStorage: LocalstorageService
    ) {}

    getExercisesByTrainerId(trainerId: number, token?: string) : Observable<ExerciseResponse>{
      if (token) {
        const headers = new HttpHeaders({
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        });
        return this.http.get<ExerciseResponse>(`${this.url}/exByTrainerId?trainerId=${trainerId}`, { headers: headers });
      } else {
        return this.http.get<ExerciseResponse>(this.url); //403 - Forbidden
      }
  }

  getExercisesByTraineeId(traineeId: number, token?: string, role?:string) : Observable<ExerciseResponse>{
    if (token) {
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      });
      return this.http.get<ExerciseResponse>(`${this.url}/exByTraineeId?traineeId=${traineeId}`, { headers: headers });
    } else {
      return this.http.get<ExerciseResponse>(this.url); //403 - Forbidden
    }
}
    

  createExercise(exercise: Exercise, token?: string){
    if (token) {
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      });
      return this.http.post<Exercise>(this.url, exercise, { headers: headers });
    } else {
      return null;
  }
}

assignExerciseToTrainer(trainerId?: number, exerciseId?: number, token?: string): Observable<Trainer> {
  const urlAdd = `https://localhost:443/api/trainers/${trainerId}/add-exercise/${exerciseId}`;

  const headers = new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  });

  return this.http.post<Trainer>(urlAdd, { headers });
}

assignExerciseToTrainee(traineeId?: number, exerciseId?: number, token?: string): Observable<Object> {

  const headers = new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  });
console.log('token= '+ token)
  return this.http.post<TraineeResponse>(`${this.url2}/${traineeId}/add-exercise/${exerciseId}`, {}, { headers });
}

unAssignExerciseToTrainee(traineeId?: number, exerciseId?: number, token?: string): Observable<Object> {

  const headers = new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  });
console.log('token= '+ token)
  return this.http.delete<TraineeResponse>(`${this.url2}/${traineeId}/remove-exercise/${exerciseId}`, { });
}

  getExercises(token?: string): Observable<ExerciseResponse>{
    if (token) {
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      });
      return this.http.get<ExerciseResponse>(this.url, { headers: headers });
    } else {
      return this.http.get<ExerciseResponse>(this.url); //403 - Forbidden
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
      return this.http.get<ExerciseResponse>(this.url); //403 - Forbidden
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
      return this.http.get<ExerciseResponse>(this.url); //403 - Forbidden
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
      return this.http.get<ExerciseResponse>(this.url); //403 - Forbidden
    }
  }

}


  // getExerciseDetails(id:number): Observable<Object>{
  //   return this.http.get<ExerciseResponse>(`${this.url}/${id}`)
  // }

  // getExerciseDetails({token: string; exerciseId: number}): Observable<ExerciseResponse>{
  //   if (token) {
  //     const headers = new HttpHeaders({
  //       'Content-Type': 'application/json',
  //       Authorization: `Bearer ${token}`,
  //     });
  //     return this.http.get<ExerciseResponse>(this.url, { headers: headers});
  //   } else {
  //     return this.http.put<ExerciseResponse>(this.url, id)
  //   }
  // }

  // createExercise(exercise:Exercise): Observable<Object>{
  //   return this.http.post<ExerciseResponse>(`${this.url}`, exercise);
  // }

  // updateExercise(id: number, exercise: Exercise): Observable<Object> {
  //   return this.http.put<ExerciseResponse>(`${this.url}/${id}`, exercise);
  // }

  // updateExercise(exercise: Exercise,  exerciseId: number, token?: string){
  //   if (token) {
  //     const headers = new HttpHeaders({
  //       'Content-Type': 'application/json',
  //       Authorization: `Bearer ${token}`,
  //     });
  //     return this.http.put<ExerciseResponse>(`${this.url}/${exerciseId}`, exercise, { headers: headers});
  //   }
  // }


