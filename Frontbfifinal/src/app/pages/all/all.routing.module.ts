import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {AllComponent} from './all.component';
import {EmetteurComponent} from './Emetteur/emetteur.component';
import {TitreComponent} from './Titre/titre.component';
import {EcheanceComponent} from './Echeance/echeance.component';
import { EcheanceIFRSComponent } from "./EcheanceIFRS/echeanceIFRS.component";
import { UpdateEmComponent } from "./UpdateEmetteur/updateEm.component";
import { UpdateTiComponent } from "./UpdateTitre/updateTi.component";

const routes: Routes = [{
    path: '',
    component: AllComponent,
    children: [
        {
            path: 'emetteur',
            component: EmetteurComponent,
        },
        {
            path: 'titre/:id_E',
            component: TitreComponent,
        },
        {
            path: 'echeance/:id_t',
            component: EcheanceComponent,
        },
        {
            path: 'echeanceifrs',
            component: EcheanceIFRSComponent,
        },
        {
            path: 'updateEm/:id_E',
            component: UpdateEmComponent,
        },
        {
            path: 'updateTi/:id_t',
            component: UpdateTiComponent,
        },

    ],
}];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
  })

  export class AllRoutingModule{}

  export const routedComponents =[
    AllComponent,
    EmetteurComponent,
    TitreComponent,
    EcheanceComponent,
    EcheanceIFRSComponent,
    UpdateEmComponent,
    UpdateTiComponent,
  ];