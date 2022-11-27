import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {
    NbComponentStatus,
    NbDialogRef,
    NbGlobalPhysicalPosition,
    NbGlobalPosition,
    NbToastrService,
} from '@nebular/theme';
import {UserService} from '../user.service';
import {User} from '../../all/models/user';
import {CurUser} from '../../all/models/CurUser';
import {HttpErrorResponse} from '@angular/common/http';
import {TokenStorageService} from '../../../auth/token-storage.service';
import {Router} from '@angular/router';
@Component({
    selector: 'ngx-edit-user',
    styleUrls: ['./edit-user.component.scss'],
    templateUrl: './edit-user.component.html',
})

export class EditUserComponent implements OnInit {
    @Input() id: number;
    @Input() currentUser: User;
    user: User = new User();

    // forms-Control
    userForm: FormGroup;

    // Toaster Config
    destroyByClick = true;
    duration = 2000;
    hasIcon = true;
    position: NbGlobalPosition = NbGlobalPhysicalPosition.TOP_RIGHT;
    preventDuplicates = false;
    status: NbComponentStatus = 'success';
    content: string;
    title = 'HI there!';

    constructor(private fb: FormBuilder,
        private toasterService: NbToastrService,
        private userService: UserService,
        private ref: NbDialogRef<EditUserComponent>,
        private tokenStorageService: TokenStorageService,
        private router: Router){}

    ngOnInit(): void {
        this.userForm = this.fb.group({
            username: ['', Validators.required],
            firstname: ['', Validators.required],
            lastname: ['', Validators.required],
            password: ['', [Validators.required, Validators.maxLength(8), Validators.minLength(8)]],
            email: ['', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
            phone: ['', [Validators.required, Validators.maxLength(8), Validators.minLength(8), Validators.pattern('[- +()0-9]+')]],
            roles: [null, Validators.required],
        });

        this.userService.getUserById(this.id).subscribe(res => {
            this.user = res;
            
            this.userForm.controls['username'].setValue(this.user.username);
            this.userForm.controls['firstname'].setValue(this.user.firstname);
            this.userForm.controls['lastname'].setValue(this.user.lastname);
            this.userForm.controls['email'].setValue(this.user.email);
            this.userForm.controls['phone'].setValue(this.user.phone);
            this.userForm.controls['roles'].setValue(this.user.roles[0].name);
        }, (error: HttpErrorResponse) => {
            this.status = 'danger';
            this.content = 'Error Loading User';
            this.showToast(this.status, this.title, this.content);
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

    // onCancel
    onCancel() {
        this.ref.close();
    }

    // onEditUser
    async onEditUser() {
        const {roles, username, firstname, lastname, password, email, phone} = this.userForm.value;
        this.user.username = username;
        this.user.firstname = firstname;
        this.user.lastname = lastname;
        this.user.password = password;
        this.user.email = email;
        this.user.phone = phone;
        
        this.user.roles[0].name = roles;
        console.log(this.user);
        await this.userService.editUser(this.user).then(res => {
            this.user = res;
            console.log(this.user);
            this.content = 'User Updated Successfully';
            this.status = 'success';
            this.showToast(this.status, this.title, this.content);
            this.ref.close(this.user);
            if (this.user.id === this.currentUser.id) {
                this.tokenStorageService.signOut();
                this.router.navigate(['login']);
            }
        }).catch(error => {
            this.content = 'Error';
            this.status = 'danger';
            this.showToast(this.status, this.title, this.content);
        });

    }

}