import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ExerciseService } from 'src/app/services/exercise.service';
import { LocalstorageService } from 'src/app/services/localstorage.service';
import { TrainerService } from 'src/app/services/trainer.service';
import { Exercise } from 'src/app/types/exercise';

@Component({
  selector: 'app-exercise-update',
  templateUrl: './exercise-update.component.html',
  styleUrls: ['./exercise-update.component.css']
})
export class ExerciseUpdateComponent{
  isLoggedInTrainer: boolean = false;
  isLoggedInTrainee: boolean = false;

  id!: number;
  exerciseId!: number;
  traineeId!: number;
  exercise: any = {};
  loading = false;

  trainerDetails: any = {
    trainees: []
  };

constructor(
  private exerciseService: ExerciseService, 
  private trainerService: TrainerService, 
  private route: ActivatedRoute, 
  private router:Router,
  private localStorage: LocalstorageService
  ){}

  ngOnInit() {
    this.isLoggedInTrainer = this.localStorage.isLoggedInTrainer();
    this.isLoggedInTrainee = this.localStorage.isLoggedInTrainee();
    this.route.params.subscribe(params => {
      const id = params['id']; // Assuming 'id' is the parameter name in your route
      this.id = id;
      const token = this.localStorage.getUser()?.token;

      this.getExerciseDetails(id, token);
      const traineeId = this.localStorage.getUser()?.id; 
      this.getTrainerDetails(traineeId!, token);
    });
  }

  getExerciseDetails(exerciseId: number, token?: string){
    this.exerciseService.getExerciseDetails(exerciseId, token).subscribe(
      (response) => {
        this.exercise = response;
      },
      (error) => {
        console.error('Error fetching exercise details:', error)
      }
    )
  }

  deleteExercise(exerciseId: number, token?: string): void{
    this.exerciseService.deleteExercise(exerciseId, token).subscribe(
      (response) => {
        console.log('Exercițiul a fost șters cu succes!', response)
      },
      (error) => {
        console.error('Error fetching exercise deleting:', error)
      }
    )
  }

  assignExerciseToTrainer(trainerId?: number, exerciseId?: number, token?: string){
    this.exerciseService.assignExerciseToTrainer(trainerId, exerciseId, token).subscribe(
      (response) => {
        console.log('Exercițiul a fost șters cu succes!', response)
      },
      (error) => {
        console.error('Error fetching exercise deleting:', error)
      }
    )
  }

  assignExerciseToTrainee(traineeId?: number, exerciseId?: number, token?: string){
    this.exerciseService.assignExerciseToTrainee(traineeId, exerciseId, token).subscribe(
      (response) => {
        console.log('Exercițiul a fost șters cu succes!', response)
      },
      (error) => {
        console.error('Error fetching exercise deleting:', error)
      }
    )
  }


      onChange(value: any){
    const token = this.localStorage.getUser()?.token;

    this.exerciseService.assignExerciseToTrainee(value.id, this.id, token).subscribe();
    this.loading = true;
  setTimeout(() => {
    window.history.back();
  this.loading = false;
}, 1000);
}


      onSubmit(){
        const token = this.localStorage.getUser()?.token;
        this.exerciseService.updateExercise(this.id, this.exercise, token).subscribe();
        this.loading = true;
      setTimeout(() => {
        window.history.back();
      this.loading = false;
    }, 1000);
    }

    onSubmitOnDeleteExercise(){
      const token = this.localStorage.getUser()?.token;
      this.exerciseService.deleteExercise(this.id, token).subscribe(
        (response) => {
          console.log('Exercise deleted succesfully!', response)
        },
        (error) => {
          console.error('Error fetching exercise deleting:', error)
        }
      );
      this.loading = true;
    setTimeout(() => {
      window.history.back();
    this.loading = false;
  }, 1000);
  }

  onSubmitAssignExerciseToTrainer(){
    const token = this.localStorage.getUser()?.token;
    this.exerciseService.assignExerciseToTrainer(this.id, this.exerciseId, token).subscribe(
      (response) => {
        console.log('Exercise deleted succesfully!', response)
      },
      (error) => {
        console.error('Error fetching exercise deleting:', error)
      }
    );
    this.loading = true;
  setTimeout(() => {
    window.history.back();
  this.loading = false;
}, 1000);
}

getTrainerDetails(trainerId: number, token?: string) {
  console.log('step2');
  this.trainerService.getTrainerDetails(trainerId, token).subscribe(
    (response) => {
      console.log(response)
      this.trainerDetails = response;
      console.log(this.trainerDetails.trainees)
    },
    (error) => {
      console.error('Error fetching trainer details:', error);
    }
  );
}
}

  


