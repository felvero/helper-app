import { Trainee } from "./trainee";
import { Trainer } from "./trainer";

export interface Exercise{
    id: number;
    trainer: Trainer;
    trainee: Trainee;
    exercise: Exercise;
    exerciseName: string;
    series1: number;
    series2: number;
    series3: number;
    series4: number;
    series5: number;
    series6: number;
    series7: number;
    series8: number;
    series9: number;
    series10: number;
    maximumWeight: number;
    date: Date;
    comment: string;
}

export interface ExerciseData{
    id: number;
    trainee: Trainee;
    exercise: Exercise;
    exerciseName: string;
    series1: number;
    series2: number;
    series3: number;
    series4: number;
    series5: number;
    series6: number;
    series7: number;
    series8: number;
    series9: number;
    series10: number;
    maximumWeight: number;
    date: Date;
    comment: string;
}