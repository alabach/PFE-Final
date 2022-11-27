import { Component, OnInit } from '@angular/core';
import { faTrash,  faPenToSquare,faListSquares,faCircleChevronLeft} from '@fortawesome/free-solid-svg-icons';
import {Location} from '@angular/common';

@Component({
    selector: 'ngx-echeanceIFRS',
    templateUrl: './echeanceIFRS.component.html',
    styleUrls: ['./echeanceIFRS.component.scss']
  })

  export class EcheanceIFRSComponent implements OnInit{


     // font-awesome-icons
  faTrash = faTrash; 
  faPenToSquare = faPenToSquare;
  faListSquares = faListSquares;
  faCircleChevronLeft=faCircleChevronLeft


    constructor(private _location: Location) { }

  ngOnInit(): void {
    }

    backClicked() {
      this._location.back();
    }
  }