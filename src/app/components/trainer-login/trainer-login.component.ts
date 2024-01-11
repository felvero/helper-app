import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/authentication.service';
import { LocalstorageService } from 'src/app/services/localstorage.service';
import { AuthenticationResponse } from 'src/app/types/authenticationResponse';

@Component({
  selector: 'app-trainer-login',
  templateUrl: './trainer-login.component.html',
  styleUrls: ['./trainer-login.component.css']
})
export class TrainerLoginComponent {
  form: any = {
    email: null,
    password: null,
  };
  isLoggedInTrainer = false;
  isLoginFailed = false;
  errorMessage = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private localStorageService: LocalstorageService
  ) {}

  onSubmit(): void {
    this.authService.trainerLogin(this.form.email, this.form.password).subscribe({
      next: (data: AuthenticationResponse) => {
        console.log(data);
        const accountLevel: any = data;
        accountLevel.role = "trainer";
        this.localStorageService.saveUser(data);
        this.router.navigate(['/']).then(() => window.location.reload());
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
