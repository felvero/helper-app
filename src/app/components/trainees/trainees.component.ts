import { Component, OnInit } from '@angular/core';
import { Trainee } from 'src/app/types/trainee';
import { TraineeService } from 'src/app/services/trainee.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { LocalstorageService } from 'src/app/services/localstorage.service';

@Component({
  selector: 'app-trainees',
  templateUrl: './trainees.component.html',
  styleUrls: ['./trainees.component.css'],
})

export class TraineesComponent implements OnInit{
trainees!: Trainee[];
routeSub: Subscription | undefined;
traineeDetails!: Trainee[];

constructor(
  private traineeService: TraineeService, 
  private route:ActivatedRoute, 
  private router:Router,
  private localStorage: LocalstorageService
  ){}

redirectToTraineeDetails(traineeId: number) {
  // Folosește Router pentru a naviga către trainer-details
  this.router.navigate(['/trainee-details', traineeId]);
}

  ngOnInit(): void {
    const token = this.localStorage.getUser()?.token;
    this.traineeService
    .getTrainees(token)
    .subscribe((data) => this.trainees = data.trainees);
  }
}   




  //   this.routeSub = this.route.params.subscribe(params => {
  //     this.traineeService.getTraineeDetails(params['id']).subscribe(response => {
  //       this.traineeDetails = response;
  //       return this.traineeDetails;
  //     })
  // })
  

