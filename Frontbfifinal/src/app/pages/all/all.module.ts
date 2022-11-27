import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {routedComponents,AllRoutingModule} from "./all.routing.module"
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
  declarations: [...routedComponents,

  ],
  imports: [
    CommonModule,
    AllRoutingModule,
    FontAwesomeModule,
    NbCardModule,
    NbInputModule,
    NbButtonModule,
    NbSelectModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class AllModule { }
