import { Exercise } from "./exercise";
import { Trainer } from "./trainer";

export interface Trainee {
    id: number;
    trainer: Trainer;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    phoneNumber: string;
    yearOfBirth: number;
    actualGym: string;
    date: Date;
}

export interface TraineeData {
    id: number;
    trainer: Trainer;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    yearOfBirth: number;
    actualGym: string;
    date: Date;
}