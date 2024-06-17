import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';
import { LocalstorageService } from './services/localstorage.service';
import { AuthService } from './services/authentication.service';
import { TrainerService } from './services/trainer.service';
import { TraineeService } from './services/trainee.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'helper-app';

  isLoggedInTrainer: boolean = false;
  isLoggedInTrainee: boolean = false;

  traineeDetails: any = {};
  trainerDetails: any = {};
  routeSub:Subscription | undefined;
  trainerNames: any = [];

  constructor(
    private traineeService: TraineeService, 
    private trainerService: TrainerService, 
    private route:ActivatedRoute, 
    private router:Router,
    private localStorage: LocalstorageService
    ){}

    getTraineeDetails(traineeId?: number, token?: string) {
      this.traineeService.getTraineeDetails(traineeId!, token).subscribe(
        (response) => {
          this.traineeDetails = response;
        },
        (error) => {
          console.error('Error fetching trainer details:', error);
        }
      );
    }
  
    getTrainerDetails(trainerId?: number, token?: string) {
      this.trainerService.getTrainerDetails(trainerId!, token).subscribe(
        (response) => {
          this.trainerDetails = response;
        },
        (error) => {
          console.error('Error fetching trainer details:', error);
        }
      );
    }
    

  ngOnInit(): void {
    this.isLoggedInTrainer = this.localStorage.isLoggedInTrainer();
    this.isLoggedInTrainee = this.localStorage.isLoggedInTrainee();

    this.route.params.subscribe(params => {
      const id = this.localStorage.getUser()?.id;
      const token = this.localStorage.getUser()?.token;
      //const traineeId = params['id']; // Assuming 'id' is the parameter name in your route
      if ( this.isLoggedInTrainer === true){
        this.getTrainerDetails(id, token);
      } else {
        this.getTraineeDetails(id, token);
        this.getTrainerNameByTraineeId(id, token);
      }
      
    });
  }

  getTrainerNameByTraineeId(traineeId?:number, token?:string){
    this.traineeService.getTrainerNameByTraineeId(traineeId!, token).subscribe(
      (response) => {
        this.trainerNames = response;
      },
      (error) => {
        console.error('Error fetching trainer`s exercises details:', error);
      }
    );
    
  }

  logout() {
    // this.localStorage.removeUser();
    this.localStorage.clearStorage();
    this.router.navigate(['/']).then(() => window.location.reload());
  }
}
