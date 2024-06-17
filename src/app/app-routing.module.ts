import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TrainersComponent } from './components/trainers/trainers.component';
import { TraineesComponent } from './components/trainees/trainees.component';
import { ExercisesComponent } from './components/exercises/exercises.component';
import { TrainerLoginComponent } from './components/trainer-login/trainer-login.component';
import { TraineeLoginComponent } from './components/trainee-login/trainee-login.component';
import { TrainerRegisterComponent } from './components/trainer-register/trainer-register.component';
import { TraineeRegisterComponent } from './components/trainee-register/trainee-register.component';
import { TrainerDetailsComponent } from './components/trainer-details/trainer-details.component';
import { TraineeDetailsComponent } from './components/trainee-details/trainee-details.component';
import { ExerciseDetailsComponent } from './components/exercise-details/exercise-details.component';
import { ExerciseUpdateComponent } from './components/exercise-update/exercise-update.component';
import { ExerciseCreateComponent } from './components/exercise-create/exercise-create.component';
import { ProfileComponent } from './components/profile/profile.component';
import { MyExercisesComponent } from './components/my-exercises/my-exercises.component';
import { MyTraineesComponent } from './components/my-trainees/my-trainees.component';
import { TrainerUpdateComponent } from './components/trainer-update/trainer-update.component';
import { TraineeUpdateComponent } from './components/trainee-update/trainee-update.component';
import { DefaultComponent } from './components/default/default.component';
import { ErrorOupsComponent } from './components/error-oups/error-oups.component';


const routes: Routes = [
  {path: 'trainers', component: TrainersComponent},
  {path: 'trainees', component: TraineesComponent},
  {path: 'exercises', component: ExercisesComponent},
  {path: 'profile', component: ProfileComponent},
  {path: 'trainer-register', component: TrainerRegisterComponent},
  {path: 'trainee-register', component: TraineeRegisterComponent},
  {path: 'trainer-login', component: TrainerLoginComponent},
  {path: 'trainee-login', component: TraineeLoginComponent},
  {path: 'trainer-details/:id', component: TrainerDetailsComponent },
  {path: 'trainee-details/:id', component: TraineeDetailsComponent},
  {path: 'exercise-create', component: ExerciseCreateComponent},
  {path: 'exercise-update/:id', component: ExerciseUpdateComponent},
  {path: 'exercise-details/:id', component: ExerciseDetailsComponent},
  {path: 'my-exercises', component: MyExercisesComponent},
  {path: 'my-trainees', component: MyTraineesComponent},
  {path: 'trainer-update/:id', component: TrainerUpdateComponent},
  {path: 'trainee-update/:id', component: TraineeUpdateComponent},
  {path: 'error', component: ErrorOupsComponent},
  {path: '**', component: DefaultComponent},
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
