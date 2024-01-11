import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ExerciseService } from 'src/app/services/exercise.service';
import { LocalstorageService } from 'src/app/services/localstorage.service';
import { Exercise } from 'src/app/types/exercise';

@Component({
  selector: 'app-exercises',
  templateUrl: './exercises.component.html',
  styleUrls: ['./exercises.component.css']
})

export class ExercisesComponent implements OnInit{
  exercises: any = [];
  routeSub: Subscription | undefined;

  constructor(
    private exerciseService: ExerciseService, 
    private route:ActivatedRoute, 
    private router:Router,
    private localStorage: LocalstorageService
    ){}

    redirectToExerciseUpdate(exerciseId: number){
      this.router.navigate(['/exercise-update', exerciseId])
    }

  ngOnInit(): void {
    const token = this.localStorage.getUser()?.token;
    this.exerciseService.getExercises(token).subscribe((data) => 
    this.exercises = data.exercises);
  }
}












    // const token = this.localStorage.getTrainer()?.token;
    // this.exerciseService.getExercises(token).subscribe((data) => 
    // this.exercises = data.exercises);

  //   this.routeSub = this.route.params.subscribe(params => {
  //     this.exerciseService.getExerciseDetails(params['id']).subscribe(response => {
  //       this.exerciseDetails = response;
  //       return this.exerciseDetails;
  //     })
  // })

  // redirectToExerciseDetails(exerciseId: number) {
  //   // Folosește Router pentru a naviga către trainer-details
  //   this.router.navigate(['/exercise-update', exerciseId]);
  // }