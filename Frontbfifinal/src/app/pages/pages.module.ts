import { NgModule } from '@angular/core';
import {NbLayoutModule, NbMenuModule } from '@nebular/theme';
import { ThemeModule } from '../@theme/theme.module';
import { PagesComponent } from './pages.component';
import { PagesRoutingModule } from './pages-routing.module';
import {UploadModule} from './upload/upload.module';
import { MiscellaneousModule } from './miscellaneous/miscellaneous.module';

@NgModule({
  imports: [
    PagesRoutingModule,
    ThemeModule,
    NbMenuModule,
    NbLayoutModule,
    UploadModule,
    MiscellaneousModule,
    
  ],
  declarations: [
    PagesComponent,
  ],
})
export class PagesModule {
}
