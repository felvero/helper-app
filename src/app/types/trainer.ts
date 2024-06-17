import { Exercise } from "./exercise";
import { Trainee } from "./trainee";

export interface Trainer {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    phoneNumber: string;
    yearOfBirth: number;
    actualGym: string;
    date: Date;

}

export interface trainerDetails{
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    yearOfBirth: number;
}

