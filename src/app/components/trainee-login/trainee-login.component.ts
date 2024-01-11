import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/authentication.service';
import { LocalstorageService } from 'src/app/services/localstorage.service';
import { AuthenticationResponse } from 'src/app/types/authenticationResponse';

@Component({
  selector: 'app-trainee-login',
  templateUrl: './trainee-login.component.html',
  styleUrls: ['./trainee-login.component.css']
})
export class TraineeLoginComponent {
  form: any = {
    email: null,
    password: null,
  };
  isLoggedInTrainee = false;
  isLoginFailed = false;
  errorMessage = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private localStorageService: LocalstorageService
  ) {}

  onSubmit(): void {
    this.authService.traineeLogin(this.form.email, this.form.password).subscribe({
      next: (data: AuthenticationResponse) => {
        console.log(data);
        // data.role = "Trainee";
        const accountLevel: any = data;
        accountLevel.role = "trainee";
        this.localStorageService.saveUser(data);
        this.router.navigate(['/']).then(() => window.location.reload());
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
