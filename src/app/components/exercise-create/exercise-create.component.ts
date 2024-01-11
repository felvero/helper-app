import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ExerciseService } from 'src/app/services/exercise.service';
import { LocalstorageService } from 'src/app/services/localstorage.service';
import { TrainerService } from 'src/app/services/trainer.service';
import { Exercise } from 'src/app/types/exercise';

@Component({
  selector: 'app-exercise-create',
  templateUrl: './exercise-create.component.html',
  styleUrls: ['./exercise-create.component.css']
})
export class ExerciseCreateComponent{
  isLoggedInTrainer: boolean = false;
  isLoggedInTrainee: boolean = false;

  form: any = {
    exerciseName: null,
    comment: null,
  };
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';
  constructor(
    private exerciseService: ExerciseService, 
    private trainerService: TrainerService,
    public dialog: MatDialog,
    private localStorage: LocalstorageService
    ) { }

  onSubmit() {
    this.dialog.closeAll();
    const token = this.localStorage.getUser()?.token;
  }


  onSubmitForTrainer() {
    this.dialog.closeAll();
    const token = this.localStorage.getUser()?.token;
    const trainerId = this.localStorage.getUser()?.id;
    // this.exerciseService.addExercise(this.form, token)?.subscribe();
    this.exerciseService.createExercise(this.form, token)?.subscribe();
  }

  onSubmitForTrainee() {
    this.dialog.closeAll();
    const token = this.localStorage.getUser()?.token;
    const traineeId = this.localStorage.getUser()?.id;
    this.exerciseService.createExercise(this.form, token)?.subscribe();
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





//   saveExercise(){
//     this.exerciseService.createExercise(this.exercise).subscribe( data => {
//     console.log(data);
//   // this.goToExerciseList();
// },
//   error => console.log(error));
//   }

//   onSubmit(){
//     console.log(this.exercise);
//     this.saveExercise();
//   }

    // this.exerciseService.createExerciseForTrainee(traineeId, this.form, token).subscribe(
    //   (newExercise) => {
    //     console.log('Exercițiul a fost adăugat trainee-ului cu succes', newExercise);
    //   },
    //   (error) => {
    //     console.error('Eroare la crearea exercițiului pentru trainee', error);
    //   }
    // );
