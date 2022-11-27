import { Component, OnInit } from '@angular/core';
import { faTrash,  faPenToSquare,faListSquares,faCircleChevronLeft,faPlay} from '@fortawesome/free-solid-svg-icons';
import {NbComponentStatus, NbGlobalPhysicalPosition, NbGlobalPosition, NbToastrService} from '@nebular/theme';
import { Allservice } from "../all.service";
import {Location} from '@angular/common';
import { Titre } from "../models/Titre";
import {ActivatedRoute} from '@angular/router';
import {FormBuilder, FormGroup} from '@angular/forms';
@Component({
    selector: 'ngx-titre',
    templateUrl: './titre.component.html',
    styleUrls: ['./titre.component.scss']
  })

  export class TitreComponent implements OnInit{
    TitreList:Titre[];
    noFilterTitreList:Titre[]
    
    

     // font-awesome-icons
     faPlay =faPlay;
  faTrash = faTrash; 
  faPenToSquare = faPenToSquare;
  faListSquares = faListSquares;
  faCircleChevronLeft=faCircleChevronLeft;

  // Toaster Config
  destroyByClick = true;
  duration = 5000;
  hasIcon = true;
  position: NbGlobalPosition = NbGlobalPhysicalPosition.TOP_RIGHT;
  preventDuplicates = false;
  status: NbComponentStatus = 'success';
  content: string;
  title = 'HI there!';

  // forms-Control
  researchForm: FormGroup;

  constructor(private allservice:Allservice,private toasterService: NbToastrService,private activatedRoute: ActivatedRoute,private _location: Location,private fb: FormBuilder) { }  
  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(result => this.allservice.getListTitreById(Number(result.get('id_E')))
    .subscribe(res=>{
      this.TitreList=res;
      this.noFilterTitreList =res;
      console.log(this.TitreList)
      }));
      
      this.researchForm = this.fb.group({
        
        ammortissement :['']
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

  // Search Document
  onSearchChange(){
    const{ammortissement} = this.researchForm.value;
    this.TitreList=this.noFilterTitreList;
    
    if(ammortissement !== '' && ammortissement !== 'all'){
      this.TitreList = this.TitreList.filter(x => x.periodicite_Amor === ammortissement);
    }
  }

  //Delete Titre
  deleteTitre(id_t:number){
    this.TitreList = this.TitreList.filter(x => x.id_t !== id_t);
    this.status='danger';
    this.content='Titre Deleted';
    this.showToast(this.status,this.title,this.content);
    this.allservice.deleteTitreById(id_t).subscribe();
  }
    
  backClicked() {
    this._location.back();
  }
  

  }