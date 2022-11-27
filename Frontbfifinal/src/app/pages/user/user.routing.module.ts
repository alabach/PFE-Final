import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {UserComponent} from './user.component';
import {AllUserComponent} from './all-user/all-user.component';

const routes: Routes = [{
    path: '',
    component: UserComponent,
    children: [
        {
            path: 'all',
            component: AllUserComponent,
        },
    ],
}];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})

export class UserRoutingModule {}
