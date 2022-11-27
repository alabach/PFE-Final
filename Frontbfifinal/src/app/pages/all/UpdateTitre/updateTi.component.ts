import { Component, OnInit } from '@angular/core';
import { faCircleChevronLeft} from '@fortawesome/free-solid-svg-icons';
import {Location} from '@angular/common';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {
  NbComponentStatus, 
  NbGlobalPhysicalPosition,
  NbGlobalPosition,
  NbToastrService,
} from '@nebular/theme';
import {ActivatedRoute} from '@angular/router';
import { Allservice } from "../all.service";
import { Titre } from "../models/Titre";
@Component({
    selector: 'ngx-updateTi',
    templateUrl: './updateTi.component.html',
    styleUrls: ['./updateTi.component.scss']
  })

  export class UpdateTiComponent implements OnInit {

    Titre : Titre = new Titre();

    // forms-Control
    titreForm:FormGroup;
     
  // font-awesome-icons
  faCircleChevronLeft=faCircleChevronLeft;

  // Toaster Config
  destroyByClick = true;
  duration = 2000;
  hasIcon = true;
  position: NbGlobalPosition = NbGlobalPhysicalPosition.TOP_RIGHT;
  preventDuplicates = false;
  status: NbComponentStatus = 'success';
  content: string;
  title = 'HI there!';


    constructor(private _location: Location, private activatedRoute: ActivatedRoute,private allService: Allservice,private toasterService: NbToastrService) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(result => this.allService.getTitreByid(Number(result.get('id_t')))
    .subscribe(res =>{this.Titre=res
    console.log(this.Titre)}));

    this.titreForm = new FormGroup({
      date_jouissance : new FormControl(this.Titre.date_jouissance),
      taux_intr: new FormControl(this.Titre.taux_intr),
      typeTaux: new FormControl(this.Titre.typeTaux),
      valeur_nominale_unit: new FormControl(this.Titre.valeur_nominale_unit),
      date1ereT: new FormControl(this.Titre.date1ereT),
      date_Fin: new FormControl(this.Titre.date_Fin),
      periodicite_Interet: new FormControl(this.Titre.periodicite_Interet),
      periodicite_Amor: new FormControl(this.Titre.periodicite_Amor),
    });
    }

      // Toaster Show
  private showToast(type: NbComponentStatus, title: string, body: string) {
    const config = {
      status: type,
      destroyByClick: this.destroyByClick,
      duration: this.duration,
      hasIcon: this.hasIcon,
      position: this.position,
      preventDuplicates: this.preventDuplicates,
    };

    this.toasterService.show(
      body,
      title,
      config);
    }


    backClicked() {
      this._location.back();
    }

    UpdateTitre(){
      this.allService.UpdateTitre(this.Titre.id_t,this.Titre).subscribe(data =>{this._location.back()});
      this.content = 'Titre Updated successfully ';
      this.showToast(this.status, this.title, this.content);
    }
  }