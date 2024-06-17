import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ExerciseService } from 'src/app/services/exercise.service';
import { LocalstorageService } from 'src/app/services/localstorage.service';
import { ExerciseResponse } from 'src/app/types/exerciseResponse';
import { Trainee } from 'src/app/types/trainee';
import { Trainer } from 'src/app/types/trainer';
import { TraineeService } from 'src/app/services/trainee.service';
import { TraineeResponse } from 'src/app/types/traineeResponse';

@Component({
  selector: 'app-exercise-create',
  templateUrl: './exercise-create.component.html',
  styleUrls: ['./exercise-create.component.css']
})
export class ExerciseCreateComponent implements OnInit{
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
    public dialogRef: MatDialogRef<ExerciseCreateComponent>,
    private http: HttpClient,
    private localStorage: LocalstorageService,
    private traineeService: TraineeService
    ) { }

  ngOnInit(): void {
    this.tokenGlobal = this.localStorage.getUser()?.token;
    this.traineeService.getTrainees(this.tokenGlobal).subscribe((response: TraineeResponse) => {
      this.trainees = response.trainees;
      // this.trainersCountTest = response.count;
      // this.trainersTest = response.trainers.map(value => value.firstName + value.phoneNumber);
      // this.trainersTest = response.trainers.filter(value => value.firstName.startsWith("A")).map(value => value.firstName);
      // console.log("trainerTest = " + this.trainersTest);
      // console.log("trainerCountTest = " + this.trainersCountTest);
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


      onSubmitForTrainee(selectedTraineeId: Trainee, selectedOption2: string | undefined) {
        this.selectedTraineeId = selectedTraineeId;
        console.log(selectedTraineeId);
      
          if (this.tokenGlobal) {
          const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            Authorization: `Bearer ${this.tokenGlobal}`,
          });
      
        console.log(selectedOption2)
        const newExercise = {
          trainee: {
            id:selectedTraineeId?.id,
            firstName:selectedTraineeId?.firstName,
            lastName: selectedTraineeId?.lastName,
            email: selectedTraineeId?.email,
            phoneNumber: selectedTraineeId?.phoneNumber,
            yearOfBirth: selectedTraineeId?.yearOfBirth,
            actualGym: selectedTraineeId?.actualGym
          },
          exerciseName: this.selectedOption2,
          comment: this.comment
        };
      this.http.post<ExerciseResponse>(`${this.url}/addToTrainee`, newExercise, {headers: headers}).subscribe();
        } else {
      this.http.get<ExerciseResponse>(this.urlError); //403 - Forbidden
        }
      }
    
      selectedOption2: string | undefined; // Variabila pentru a stoca valoarea selectată
      options2 = [
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
