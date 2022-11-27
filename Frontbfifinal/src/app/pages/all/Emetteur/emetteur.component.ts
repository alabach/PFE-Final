import { Component, OnInit } from '@angular/core';
import { faTrash,  faPenToSquare,faListSquares,faCirclePlus} from '@fortawesome/free-solid-svg-icons';
import {NbComponentStatus, NbGlobalPhysicalPosition, NbGlobalPosition, NbToastrService} from '@nebular/theme';
import { Allservice } from "../all.service";
import { Emetteur } from "../models/emetteurs";
import {FormBuilder, FormGroup} from '@angular/forms';


@Component({
    selector: 'ngx-emetteur',
    templateUrl: './emetteur.component.html',
    styleUrls: ['./emetteur.component.scss']
  })

  export class EmetteurComponent implements OnInit{
    emetteurList:Emetteur[];
    noFilterEmetteurList :Emetteur[];

    
     
     // font-awesome-icons
  faTrash = faTrash; 
  faPenToSquare = faPenToSquare;
  faListSquares = faListSquares;
  faCirclePlus=faCirclePlus;

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

  ngOnInit(): void {
    this.allservice.allEmetteurl().subscribe(data => {
      this.emetteurList = data;
      this.noFilterEmetteurList =data;
      console.log(this.emetteurList)
    });

    this.researchForm = this.fb.group({
      name: [''],
      segment :['']
    });
  }

    constructor(private allservice:Allservice,private toasterService: NbToastrService, private fb: FormBuilder ) { }

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

  //Delete Emetteur
  deleteEmetteur(id_E:number){
    this.emetteurList=this.emetteurList.filter(x => x.id_E !== id_E);
    this.status='danger';
    this.content='Emetteur Deleted';
    this.showToast(this.status,this.title,this.content);
    this.allservice.deleteEmetteurById(id_E).subscribe();
  }

  // Search Document
  onSearchChange(){
    const {name,segment} = this.researchForm.value;
    
    this.emetteurList = this.noFilterEmetteurList;
    if(name !== ''){
      this.emetteurList = this.emetteurList.filter(x => x.nameEmetteur.startsWith(name));
    }
    if(segment !== '' && segment !== 'all'){
      this.emetteurList = this.emetteurList.filter(x => x.segmentE === segment );
    }
  }
    

  }