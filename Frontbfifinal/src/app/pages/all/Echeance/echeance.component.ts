import { Component, OnInit } from '@angular/core';
import { faTrash,  faPenToSquare,faListSquares,faCircleChevronLeft} from '@fortawesome/free-solid-svg-icons';
import { Allservice } from "../all.service";
import {ActivatedRoute} from '@angular/router';
import { Echeance } from "../models/Echeance";
import {Location} from '@angular/common';
@Component({
    selector: 'ngx-echeance',
    templateUrl: './echeance.component.html',
    styleUrls: ['./echeance.component.scss']
  })

  export class EcheanceComponent implements OnInit{

    Echeancelist: Echeance[];

     // font-awesome-icons
  faTrash = faTrash; 
  faPenToSquare = faPenToSquare;
  faListSquares = faListSquares;
  faCircleChevronLeft=faCircleChevronLeft;


    constructor(private allservice:Allservice,private activatedRoute: ActivatedRoute,private _location: Location) { }

  ngOnInit(): void {
      this.activatedRoute.paramMap.subscribe(result =>this.allservice.generateEcheancier(Number(result.get('id_t')))
      .subscribe(res =>{
        this.Echeancelist=res;
        console.log(this.Echeancelist);
      }))
    }

    backClicked() {
      this._location.back();
    }
  }