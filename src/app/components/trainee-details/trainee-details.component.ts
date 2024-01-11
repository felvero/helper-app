import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { LocalstorageService } from 'src/app/services/localstorage.service';
import { TraineeService } from 'src/app/services/trainee.service';
import { ExerciseCreateComponent } from '../exercise-create/exercise-create.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-trainee-details',
  templateUrl: './trainee-details.component.html',
  styleUrls: ['./trainee-details.component.css']
})
export class TraineeDetailsComponent implements OnInit {

  isLoggedInTrainer: boolean = false;
  isLoggedInTrainee: boolean = false;

  traineeDetails: any = {
    exercises: []
  };
  routeSub:Subscription | undefined;

  constructor(
    private traineeService: TraineeService, 
    private route:ActivatedRoute, 
    private router:Router,
    private localStorage: LocalstorageService,
    public dialog: MatDialog
    ){}

    ngOnInit() {
      this.isLoggedInTrainer = this.localStorage.isLoggedInTrainer();
      this.isLoggedInTrainee = this.localStorage.isLoggedInTrainee();

      this.route.params.subscribe(params => {
        const id = params['id']; // Assuming 'id' is the parameter name in your route
        const token = this.localStorage.getUser()?.token;
  
        this.getTraineeDetails(id, token);
      });

      
      this.route.paramMap.subscribe(params => {
        const traineeId = params.get('traineeId');
    });
  }


  
    getTraineeDetails(traineeId: number, token?: string) {
      this.traineeService.getTraineeDetails(traineeId, token).subscribe(
        (response) => {
          this.traineeDetails = response;
        },
        (error) => {
          console.error('Error fetching trainer details:', error);
        }
      );
    }

    openDialog() {
      const dialogRef = this.dialog.open(ExerciseCreateComponent);
  
      dialogRef.afterClosed().subscribe(result => {
        console.log(`Dialog result: ${result}`);
      });
    }

    redirectToExerciseUpdateByTrainer(exerciseId: number){
      this.router.navigate(['/exercise-update', exerciseId])
    }

    
}



    // this.routeSub = this.route.params.subscribe(params => {
    //   this.traineeService.getTraineeDetails(params['id']).subscribe(response =>{
    //     this.traineeDetails = response;
    //     return this.traineeDetails;
    //   })
    // })