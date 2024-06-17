import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { LocalstorageService } from 'src/app/services/localstorage.service';
import { TraineeService } from 'src/app/services/trainee.service';
import { TrainerService } from 'src/app/services/trainer.service';

@Component({
  selector: 'app-trainer-details',
  templateUrl: './trainer-details.component.html',
  styleUrls: ['./trainer-details.component.css']
})
export class TrainerDetailsComponent implements OnInit {

  isLoggedInTrainer: boolean = false;
  isLoggedInTrainee: boolean = false;

  trainerDetails: any = {
    trainees: []
  };
  trainerId!: number;
  traineeId!: number;
  loading = false;

  routeSub:Subscription | undefined;

  constructor(
    private trainerService: TrainerService,
    private route:ActivatedRoute, 
    private router:Router,
    private localStorage:LocalstorageService
    ){}

    ngOnInit() {
      this.isLoggedInTrainer = this.localStorage.isLoggedInTrainer();
      this.isLoggedInTrainee = this.localStorage.isLoggedInTrainee();

      this.route.params.subscribe(params => {
        const id = params['id']; 
        const token = this.localStorage.getUser()?.token;
        const traineeId = this.localStorage.getUser()?.id; 
        this.getTrainerDetails(id, token);
        this.trainerId = id;
        this.traineeId = traineeId!;
      });
    }
  
    getTrainerDetails(trainerId: number, token?: string) {
      this.trainerService.getTrainerDetails(trainerId, token).subscribe(
        (response) => {
          this.trainerDetails = response;
        },
        (error) => {
          console.error('Error fetching trainer details:', error);
        }
      );
    }

    redirectToTraineeDetails(traineeId: number) {

      this.router.navigate(['/trainee-details', traineeId]);
    }
}
