import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { throwError } from 'rxjs';
import { AuthService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-trainee-register',
  templateUrl: './trainee-register.component.html',
  styleUrls: ['./trainee-register.component.css']
})
export class TraineeRegisterComponent {
  hide = true;
  form: any = {
    firstName: null,
    lastName: null,
    email: null,
    password: null,
    phoneNumber: null,
    yearOfBirth: null,
    actualGym: null
  };
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';
  
  constructor(private authService: AuthService) {}
  
  onSubmit() {
    // return this.http.post(this.url, this.form)
    // .pipe(
    //   catchError(this.handleError)
    // );
    this.authService.traineeRegister(this.form.firstName, this.form.lastName, this.form.email, this.form.password, this.form.phoneNumber, this.form.yearOfBirth, this.form.actualGym)
      .subscribe({
        next: data => {
          console.log(data);
        },
        error: err => {
          console.log(err);
        }
      });
    // console.log(this.form);
  }
  
  
  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }
    // Return an observable with a user-facing error message.
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }
  
  
  }
  