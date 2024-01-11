import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ExerciseService } from 'src/app/services/exercise.service';
import { LocalstorageService } from 'src/app/services/localstorage.service';
import { TraineeService } from 'src/app/services/trainee.service';
import { TrainerService } from 'src/app/services/trainer.service';
import { Trainer } from 'src/app/types/trainer';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  isLoggedInTrainer: boolean = false;
  isLoggedInTrainee: boolean = false;

  traineeDetails: any = {};
  trainerDetails: any = {
    exercises: []
  };
  

  routeSub:Subscription | undefined;

  constructor(
    private traineeService: TraineeService, 
    private trainerService: TrainerService, 
    private route:ActivatedRoute, 
    private router:Router,
    private localStorage: LocalstorageService,
    private exerciseService: ExerciseService
    ){}

  ngOnInit(): void {
    this.isLoggedInTrainer = this.localStorage.isLoggedInTrainer();
    this.isLoggedInTrainee = this.localStorage.isLoggedInTrainee();

    this.route.params.subscribe(params => {
      const id = this.localStorage.getUser()?.id;
      const token = this.localStorage.getUser()?.token;

      this.getTrainerDetails(id, token);
      this.getTraineeDetails(id, token);

    });
  }

  getTraineeDetails(id?: number, token?: string) {
    this.traineeService.getTraineeDetails(id!, token).subscribe(
      (response) => {
        this.traineeDetails = response;
      },
      (error) => {
        console.error('Error fetching trainer details:', error);
      }
    );
  }

  getTrainerDetails(id?: number, token?: string) {
    this.trainerService.getTrainerDetails(id!, token).subscribe(
      (response) => {
        this.trainerDetails = response;
      },
      (error) => {
        console.error('Error fetching trainer details:', error);
      }
    );
  }
  

}
