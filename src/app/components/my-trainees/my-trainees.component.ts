import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { LocalstorageService } from 'src/app/services/localstorage.service';
import { TraineeService } from 'src/app/services/trainee.service';

@Component({
  selector: 'app-my-trainees',
  templateUrl: './my-trainees.component.html',
  styleUrls: ['./my-trainees.component.css']
})
export class MyTraineesComponent {

  isLoggedInTrainer: boolean = false;

  trainees: any = [];
  routeSub: Subscription | undefined;

  constructor(
    private http: HttpClient,
    private localStorage: LocalstorageService,
    private traineeService: TraineeService,
    private route:ActivatedRoute, 
    private router:Router
  ){}

  ngOnInit(): void {
    this.isLoggedInTrainer = this.localStorage.isLoggedInTrainer();

    this.route.params.subscribe(params => {
      const id = this.localStorage.getUser()?.id;
      const token = this.localStorage.getUser()?.token;
  
      this.getTraineesByTrainerId(id, token);
    });
  }

  getTraineesByTrainerId(trainerId?: number, token?: string) {
    this.traineeService.getTraineesByTrainerId(trainerId!, token).subscribe(
      (response) => {
        this.trainees = response;
      },
      (error) => {
        console.error('Error fetching trainer`s exercises details:', error);
      }
    );
  }

  redirectToTraineeDetails(traineeId: number) {
    // Folosește Router pentru a naviga către trainer-details
    this.router.navigate(['/trainee-details', traineeId]);
  }

  // getTrainerByTraineeId(traineeId?: number, token?: string) {
  //   this.traineeService.getTrainerByTraineeId(traineeId!, token).subscribe(
  //     (response) => {
  //       this.trainees = response;
  //     },
  //     (error) => {
  //       console.error('Error fetching trainer`s exercises details:', error);
  //     }
  //   );
  // }
  
}
