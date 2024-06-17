import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ExerciseService } from 'src/app/services/exercise.service';
import { LocalstorageService } from 'src/app/services/localstorage.service';
import { ExerciseResponse } from 'src/app/types/exerciseResponse';
import { Trainee } from 'src/app/types/trainee';
import { Trainer } from 'src/app/types/trainer';
import { TrainerService } from 'src/app/services/trainer.service';
import { TrainerResponse } from 'src/app/types/trainerResponse';

@Component({
  selector: 'app-exercise-create',
  templateUrl: './exercise-create2.component.html',
  styleUrls: ['./exercise-create2.component.css']
})
export class ExerciseCreate2Component implements OnInit{
  isLoggedInTrainer: boolean = false;
  isLoggedInTrainee: boolean = false;

  selectedTrainerId!: Trainer;
  selectedTraineeId!: Trainee;
  exerciseName: string = "";
  comment: string = "";
  trainers: Trainer [] = [];
  trainees: Trainee[] = [];

  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';

  tokenGlobal: string | undefined;

  trainersTest: string [] = [];
  trainersCountTest!: number;
  private url: string = "https://localhost:443/api/exercises"
  private urlError: string = "http://localhost:4200/error"

  constructor(
    private exerciseService: ExerciseService, 
    public dialog: MatDialog,  
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<ExerciseCreate2Component>,
    private http: HttpClient,
    private localStorage: LocalstorageService,
    private trainerService: TrainerService
    ) { }

  ngOnInit(): void {
    this.tokenGlobal = this.localStorage.getUser()?.token;
    this.trainerService.getTrainers(this.tokenGlobal).subscribe((response: TrainerResponse) => {
      this.trainers = response.trainers;
    });
  }

  onSubmitForTrainer(selectedTrainerId: Trainer, selectedOption: string | undefined) {
    this.selectedTrainerId = selectedTrainerId;
    console.log(selectedTrainerId);
  
      if (this.tokenGlobal) {
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.tokenGlobal}`,
      });
  
    console.log(selectedOption)
    const newExercise = {
      trainer: {
        id:selectedTrainerId?.id,
        firstName:selectedTrainerId?.firstName,
        lastName: selectedTrainerId?.lastName,
        email: selectedTrainerId?.email,
        phoneNumber: selectedTrainerId?.phoneNumber,
        yearOfBirth: selectedTrainerId?.yearOfBirth,
        actualGym: selectedTrainerId?.actualGym
      },
      exerciseName: this.selectedOption,
      comment: this.comment
    };
  this.http.post<ExerciseResponse>(`${this.url}/addToTrainer`, newExercise, {headers: headers}).subscribe();
    } else {
  this.http.get<ExerciseResponse>(this.urlError); //403 - Forbidden
    }
  }

  selectedOption: string | undefined; // Variabila pentru a stoca valoarea selectată
  options = [
      { value: 'Push-up', label: 'Push-up' },
      { value: 'Pull-up', label: 'Pull-up' },
      { value: 'Squat', label: 'Squat' },
      { value: 'Deadlift', label: 'Deadlift' },
      { value: 'Plank', label: 'Plank' },
      { value: 'Dumbbell Press', label: 'Dumbbell Press' },
      { value: 'Lunges', label: 'Lunges' },
      { value: 'Bench Press', label: 'Bench Press' },
      { value: 'Leg Press', label: 'Leg Press' },
      { value: 'Lat Pulldown', label: 'Lat Pulldown' },
      { value: 'Barbell Row', label: 'Barbell Row' },
      { value: 'Shoulder Press', label: 'Shoulder Press' },
      { value: 'Bicep Curls', label: 'Bicep Curls' },
      { value: 'Tricep Dips', label: 'Tricep Dips' },
      { value: 'Ab Crunches', label: 'Ab Crunches' },
      { value: 'Russian Twists', label: 'Russian Twists' },
      { value: 'Leg Curls', label: 'Leg Curls' },
      { value: 'Leg Extensions', label: 'Leg Extensions' },
      { value: 'Seated Row', label: 'Seated Row' },
      { value: 'Box Jumps', label: 'Box Jumps' },
      { value: 'Kettlebell Swings', label: 'Kettlebell Swings' },
      { value: 'Medicine Ball Slams', label: 'Medicine Ball Slams' },
      { value: 'Battle Ropes', label: 'Battle Ropes' },
      { value: 'Mountain Climbers', label: 'Mountain Climbers' },
      { value: 'Burpees', label: 'Burpees' },
      ];
}
