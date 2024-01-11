import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ExerciseService } from 'src/app/services/exercise.service';



@Component({
  selector: 'app-exercise-details',
  templateUrl: './exercise-details.component.html',
  styleUrls: ['./exercise-details.component.css']
})
export class ExerciseDetailsComponent implements OnInit{


  exerciseDetails: any = [];


  exercise: any = [];
  routeSub: Subscription | undefined;

  constructor(
    private formBuilder: FormBuilder,
    private exerciseService: ExerciseService, 
    private route:ActivatedRoute, 
    private router:Router
    ){}
  


  ngOnInit(){
    // this.routeSub = this.route.params.subscribe(params => {
    //   this.exerciseService.getExerciseDetails(params['id']).subscribe(response =>{
    //     this.exerciseDetails = response;
    //     return this.exerciseDetails;
    //   });
    // })


    }
  }

