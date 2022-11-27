import { Component, OnInit } from '@angular/core';
import { faCloudArrowUp, faFileImport, faCheck , faXmark , faTrash , faCirclePlus} from '@fortawesome/free-solid-svg-icons';
import { UploadSrvice } from "../upload.service";
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {
  NbComponentStatus,
  NbDialogRef,
  NbGlobalPhysicalPosition,
  NbGlobalPosition,
  NbToastrService,
} from '@nebular/theme';
@Component({
  selector: 'ngx-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent implements OnInit {
  fileInput: any;
  // font-awesome-icons
  faCloudArrowUp = faCloudArrowUp;
  faFileImport = faFileImport;
  faCheck = faCheck;
  faXmark = faXmark;
  faTrash = faTrash;
  faCirclePlus = faCirclePlus;

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
  fileForm: FormGroup;
  constructor(private uploadService: UploadSrvice, private fb: FormBuilder,private toasterService: NbToastrService,) { }

  ngOnInit(): void {
    this.fileForm = this.fb.group({
      fileCtrl: [null, Validators.required],
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

   formData: FormData = new FormData();

    ValideFile(){

    this.uploadService.fileDetails(this.formData);
    
    this.status = 'success';
    this.content = 'File Import Successfully';
    this.showToast(this.status, this.title, this.content);
  }

  //File Upload
  async onUploadFile(event){
    this.fileInput = event.target.files[0];
    
    this.formData.append('file',this.fileInput);

   
    
  }

}
