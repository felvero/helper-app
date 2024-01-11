import { Component, OnInit } from '@angular/core';
import { Trainer } from 'src/app/types/trainer';
import { TrainerService } from 'src/app/services/trainer.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { LocalstorageService } from 'src/app/services/localstorage.service';

@Component({
  selector: 'app-trainers',
  templateUrl: './trainers.component.html',
  styleUrls: ['./trainers.component.css'],
})
export class TrainersComponent implements OnInit{
trainers!: Trainer[];
routeSub:Subscription | undefined;
trainerDetails!: Trainer[];

constructor(
  private trainerService: TrainerService, 
  private route:ActivatedRoute, 
  private router:Router,
  private localStorage: LocalstorageService
  ){}

redirectToTrainerDetails(trainerId: number) {
  // Folosește Router pentru a naviga către trainer-details
  this.router.navigate(['/trainer-details', trainerId]);
}

ngOnInit(): void {
  const token = this.localStorage.getUser()?.token;
  this.trainerService
  .getTrainers(token)
  .subscribe((data) => this.trainers = data.trainers);
  }
}





  //   this.routeSub = this.route.params.subscribe(params => {
  //     this.trainerService.getTrainerDetails(params['id']).subscribe(response => {
  //       this.trainerDetails = response;
  //       return this.trainerDetails;
  //     })
  // })
  


