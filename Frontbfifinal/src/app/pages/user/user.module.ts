import {NgModule} from '@angular/core';
import {UserComponent} from './user.component';
import {CommonModule} from '@angular/common';
import {UserRoutingModule} from './user.routing.module';
import {AllUserComponent} from './all-user/all-user.component';
import {NbCardModule, NbTooltipModule, NbInputModule, NbOptionModule, NbSelectModule , NbButtonModule} from '@nebular/theme';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {AddUserComponent} from './add-user/add-user.component';
import {EditUserComponent} from './edit-user/edit-user.component';
import {ReactiveFormsModule} from '@angular/forms';
import {NgxPaginationModule} from 'ngx-pagination';

@NgModule({
    imports: [
        CommonModule,
        UserRoutingModule,
        NbCardModule,
        FontAwesomeModule,
        NbTooltipModule,
        NbInputModule,
        NbOptionModule,
        NbSelectModule,
        NbButtonModule,
        ReactiveFormsModule,
        NgxPaginationModule,
    ],
    declarations: [
        UserComponent,
        AllUserComponent,
        AddUserComponent,
        EditUserComponent,
    ],
})

export class UserModule {

}
