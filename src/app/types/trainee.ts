import { Exercise } from "./exercise";

export interface Trainee {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    phoneNumber: string;
    yearOfBirth: number;
    actualGym: string;
    date: Date;
    exercises: Exercise[];
}

export interface TraineeData {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    yearOfBirth: number;
    actualGym: string;
    date: Date;
    exercises: Exercise[];
}