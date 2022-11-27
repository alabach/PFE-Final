import { Component, OnInit } from '@angular/core';
import { faCircleChevronLeft} from '@fortawesome/free-solid-svg-icons';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {
  NbComponentStatus, 
  NbGlobalPhysicalPosition,
  NbGlobalPosition,
  NbToastrService,
} from '@nebular/theme';
import {Location} from '@angular/common';
import {ActivatedRoute} from '@angular/router';
import { Allservice } from "../all.service";
import { Emetteur } from "../models/emetteurs";

@Component({
    selector: 'ngx-updateEm',
    templateUrl: './updateEm.component.html',
    styleUrls: ['./updateEm.component.scss']
  })

  export class UpdateEmComponent implements OnInit {

    Emetteur : Emetteur = new Emetteur();
    

     
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

  // forms-Control
  emetteurForm: FormGroup;
  

    constructor(private _location: Location, private activatedRoute: ActivatedRoute,private allService: Allservice,private toasterService: NbToastrService) { }

  ngOnInit(): void {
      this.activatedRoute.paramMap.subscribe(result => this.allService.getEmetteurByid(Number(result.get('id_E')))
      .subscribe(res => {this.Emetteur = res
      console.log(this.Emetteur)}));

      this.emetteurForm = new FormGroup({
        nameEmetteur: new FormControl(this.Emetteur.nameEmetteur),
        paysEmetteur: new FormControl(this.Emetteur.paysEmetteur),
        segmentE: new FormControl(this.Emetteur.segmentE),
        secteurE: new FormControl(this.Emetteur.secteurE),
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

    UpdateEmetteur(){
      this.allService.UpdateEmetteur(this.Emetteur.id_E,this.Emetteur).subscribe(data => {this._location.back()});
      this.content = 'Emetteur Updated successfully ';
      this.showToast(this.status, this.title, this.content);
    }
  }