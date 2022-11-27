import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UploadComponent } from './upload/upload.component';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {
  NbCardModule,
  NbStepperModule,
  NbButtonModule,
  NbSelectModule,
  NbDatepickerModule,
  NbInputModule,
  NbSpinnerModule,
  NbTooltipModule,
} from '@nebular/theme';



@NgModule({
  declarations: [
    UploadComponent
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    NbCardModule,
    FormsModule,
    ReactiveFormsModule,
    NbButtonModule,
  ]
})
export class UploadModule { }
