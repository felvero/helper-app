import { Injectable } from '@angular/core';

const USER_KEY = 'auth-user';

@Injectable({
  providedIn: 'root'
})
export class LocalstorageService {

  constructor() {}

  public saveUser(user: {token: string, id: number, role: string}) {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  public getUser(): { token: string; id: number, role: string} | null {
    const userString = localStorage.getItem(USER_KEY);
    if(userString){
      return JSON.parse(userString);
    }
    return null;
  }

  // public removeTrainer() {
  //   localStorage.removeItem(USER_KEY);
  // }

  // public saveTrainee(trainee: {token: string, id: number}) {
  //   localStorage.setItem(USER_KEY, JSON.stringify(trainee));
  // }

  // public getTrainee(): {token: string; id: number} | null {
  //   const traineeString = localStorage.getItem(USER_KEY);
  //   if(traineeString){
  //     return JSON.parse(traineeString);
  //   }
  //   return null;
  // }
  public removeUser() {
    localStorage.removeItem(USER_KEY);
  }

  public clearStorage() {
    localStorage.clear();
  }

  // public getExercise() {
  //   return localStorage.getItem(USER_KEY);
  // }

  public isLoggedInTrainer(): boolean {
    const user = this.getUser();
    const accountLevel: any = {
      role: "trainer"
    };
    if (user && user.role === accountLevel.role) {
      return true;
    }
    return false;
  }

  public isLoggedInTrainee(): boolean {
    const user = this.getUser();
    const accountLevel: any = {
      role: "trainee"
    };
    if (user && user.role === accountLevel.role) {
      return true;
    }
    return false;
  }


  // public isLoggedInTrainee(): boolean {
  //   const user = this.getUser();
  //   const accountLevel: any = "";
  //   accountLevel.role = "trainee";
  //   if (user && accountLevel)  {
  //     return true;
  //   }
  //   return false;
  // }

  // public isLoggedInTrainee(): boolean {
  //   const user = this.getTrainee();
  //   if (user) {
  //     return true;
  //   }
  //   return false;
  // }

  ///ROLE
}
