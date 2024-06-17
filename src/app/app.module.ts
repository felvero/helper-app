import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { TrainersComponent } from './components/trainers/trainers.component';
import { TraineesComponent } from './components/trainees/trainees.component';
import { ExercisesComponent } from './components/exercises/exercises.component';
import { TrainerLoginComponent } from './components/trainer-login/trainer-login.component';
import { TraineeLoginComponent } from './components/trainee-login/trainee-login.component';
import { TrainerRegisterComponent } from './components/trainer-register/trainer-register.component';
import { TraineeRegisterComponent } from './components/trainee-register/trainee-register.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule} from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSelectModule } from '@angular/material/select';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { TrainerDetailsComponent } from './components/trainer-details/trainer-details.component';
import { TraineeDetailsComponent } from './components/trainee-details/trainee-details.component';
import { ExerciseDetailsComponent } from './components/exercise-details/exercise-details.component';
import { ExerciseUpdateComponent } from './components/exercise-update/exercise-update.component';
import { ExerciseCreateComponent } from './components/exercise-create/exercise-create.component';
import { ProfileComponent } from './components/profile/profile.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ExercisesByProfileComponent } from './components/exercises-by-profile/exercises-by-profile.component';
import { MyExercisesComponent } from './components/my-exercises/my-exercises.component';
import { MyTraineesComponent } from './components/my-trainees/my-trainees.component';
import { TrainerUpdateComponent } from './components/trainer-update/trainer-update.component';
import { TraineeUpdateComponent } from './components/trainee-update/trainee-update.component';
import { DefaultComponent } from './components/default/default.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { ErrorOupsComponent } from './components/error-oups/error-oups.component';
import { ExerciseCreate2Component } from './components/exercise-create2/exercise-create2.component';




@NgModule({
  declarations: [
    AppComponent,
    TrainersComponent,
    TraineesComponent,
    ExercisesComponent,
    TrainerLoginComponent,
    TraineeLoginComponent,
    TrainerRegisterComponent,
    TraineeRegisterComponent,
    TrainerDetailsComponent,
    TraineeDetailsComponent,
    ExerciseDetailsComponent,
    ExerciseUpdateComponent,
    ExerciseCreateComponent,
    ProfileComponent,
    ExercisesByProfileComponent,
    MyExercisesComponent,
    MyTraineesComponent,
    TrainerUpdateComponent,
    TraineeUpdateComponent,
    DefaultComponent,
    ErrorOupsComponent,
    ExerciseCreate2Component,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatButtonModule,
    MatToolbarModule,
    HttpClientModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatDividerModule,
    FormsModule,
    MatSelectModule,
    MatMenuModule,
    MatPaginatorModule,
    MatTooltipModule,
    MatIconModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    MatExpansionModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
