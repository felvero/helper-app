import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LocalstorageService } from 'src/app/services/localstorage.service';
import { TrainerService } from 'src/app/services/trainer.service';

@Component({
  selector: 'app-trainer-update',
  templateUrl: './trainer-update.component.html',
  styleUrls: ['./trainer-update.component.css']
})
export class TrainerUpdateComponent {
  id!: number;
  trainer: any = {};
  loading = false;

  constructor(
    private trainerService: TrainerService, 
    private route: ActivatedRoute, 
    private router:Router,
    private localStorage: LocalstorageService
    ){}

    ngOnInit() {
      this.route.params.subscribe(params => {
        const id = params['id']; // Assuming 'id' is the parameter name in your route
        this.id = id;
        const token = this.localStorage.getUser()?.token;
  
        this.getTrainerDetails(id, token);
      });
    }

    getTrainerDetails(trainerId: number, token?: string){
      this.trainerService.getTrainerDetails(trainerId, token).subscribe(
        (response) => {
          this.trainer = response;
        },
        (error) => {
          console.error('Error fetching exercise details:', error)
        }
      )
    }

    onSubmit(){
      const token = this.localStorage.getUser()?.token;
      this.trainerService.updateTrainer(this.id, this.trainer, token).subscribe();
      this.loading = true;
    setTimeout(() => {
      window.history.back();
    this.loading = false;
  }, 1000);

  }
}
