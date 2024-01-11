import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ExerciseService } from 'src/app/services/exercise.service';
import { LocalstorageService } from 'src/app/services/localstorage.service';
import { ExerciseCreateComponent } from '../exercise-create/exercise-create.component';

@Component({
  selector: 'app-my-exercises',
  templateUrl: './my-exercises.component.html',
  styleUrls: ['./my-exercises.component.css']
})
export class MyExercisesComponent {
  isLoggedInTrainer: boolean = false;
  isLoggedInTrainee: boolean = false;

  exercises: any = [];
  routeSub: Subscription | undefined;

constructor(
  private http: HttpClient,
  private localStorage: LocalstorageService,
  private exerciseService: ExerciseService,
  private route:ActivatedRoute, 
  private router:Router,
  public dialog: MatDialog
){}

ngOnInit(): void {
  const user = this.localStorage.getUser();

  if (user?.role === "trainer") {
    const trainerId = user.id;
    const token = user.token;
    this.isLoggedInTrainer = this.localStorage.isLoggedInTrainer();
    this.getExercisesByTrainerId(trainerId, token);
  } 
  else if (user?.role === "trainee"){
    const traineeId = user.id;
    const token = user.token;
    this.isLoggedInTrainee = this.localStorage.isLoggedInTrainee();
    this.getExercisesByTraineeId(traineeId, token);
  }
}



redirectToExerciseUpdateByProfile(exerciseId: number){
  this.router.navigate(['/exercise-update', exerciseId])
}


getExercisesByTraineeId(traineeId?: number, token?: string) {
  this.exerciseService.getExercisesByTraineeId(traineeId!, token).subscribe(
    (response) => {
      this.exercises = response;
    },
    (error) => {
      console.error('Error fetching trainee`s exercises details:', error);
    }
  );
}

getExercisesByTrainerId(trainerId?: number, token?: string)  {
  this.exerciseService.getExercisesByTrainerId(trainerId!, token).subscribe(
    (response) => {
      this.exercises = response;
    },
    (error) => {
      console.error('Error fetching trainer`s exercises details:', error);
    }
  );
}

openDialog() {
  const dialogRef = this.dialog.open(ExerciseCreateComponent);

  dialogRef.afterClosed().subscribe(result => {
    console.log(`Dialog result: ${result}`);
  });
}



// ngOnInit(): void {
//   const token = this.localStorage.getUser()?.token;
//   this.exerciseService.getExercisesByTrainerId(token).subscribe((data) => 
//   this.exercises = data.exercises);
// }
}




