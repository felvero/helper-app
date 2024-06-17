import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LocalstorageService } from 'src/app/services/localstorage.service';
import { TraineeService } from 'src/app/services/trainee.service';

@Component({
  selector: 'app-trainee-update',
  templateUrl: './trainee-update.component.html',
  styleUrls: ['./trainee-update.component.css']
})
export class TraineeUpdateComponent {
  id!: number;
  trainee: any = {};
  loading = false;

  constructor(
    private traineeService: TraineeService, 
    private route: ActivatedRoute, 
    private router:Router,
    private localStorage: LocalstorageService
    ){}

    ngOnInit() {
      this.route.params.subscribe(params => {
        const id = params['id']; 
        this.id = id;
        const token = this.localStorage.getUser()?.token;
  
        this.getTraineeDetails(id, token);
      });
    }

    getTraineeDetails(traineeId: number, token?: string){
      this.traineeService.getTraineeDetails(traineeId, token).subscribe(
        (response) => {
          this.trainee = response;
        },
        (error) => {
          console.error('Error fetching exercise details:', error)
        }
      )
    }

    onSubmit(){
      const token = this.localStorage.getUser()?.token;
      this.traineeService.updateTrainee(this.id, this.trainee, token).subscribe();
      this.loading = true;
    setTimeout(() => {
      window.history.back();
    this.loading = false;
  }, 1000);

  }
}
