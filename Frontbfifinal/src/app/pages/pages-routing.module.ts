import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { PagesComponent } from './pages.component';
import{UploadComponent } from "./upload/upload/upload.component";
import { NotFoundComponent } from './miscellaneous/not-found/not-found.component';


const routes: Routes = [{
  path: '',
  component: PagesComponent,
  children: [
    {
      path: 'upload',
      component: UploadComponent ,
    },
    {
      path: 'all',
      loadChildren: () => import('./all/all.module')
        .then(m => m.AllModule),
    },
    {
      path: 'user',
      loadChildren: () => import('./user/user.module')
          .then(m => m.UserModule),
    },
    {
      path: '',
      redirectTo: 'upload',
      pathMatch: 'full',
    },
    {
      path: '**',
      component: NotFoundComponent,
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {
}
