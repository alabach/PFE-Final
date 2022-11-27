import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {
    NbComponentStatus,
    NbDialogRef,
    NbGlobalPhysicalPosition,
    NbGlobalPosition,
    NbToastrService,
} from '@nebular/theme';
import {User} from '../../all/models/user';
import {SignupRequest} from '../../all/models/SignupRequest';
import {UserService} from '../user.service';
import {HttpErrorResponse} from '@angular/common/http';
@Component({
    selector: 'ngx-add-user',
    styleUrls: ['./add-user.component.scss'],
    templateUrl: './add-user.component.html',
})

export class AddUserComponent implements OnInit {
    userList: User[] = [];
    
    signupRequest :SignupRequest = new SignupRequest();
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
        private ref: NbDialogRef<AddUserComponent>,
        private userService: UserService){}

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
    async onAAddUser() {
        const {roles, username, firstname, lastname, password, email, phone} = this.userForm.value;
        console.log(this.userForm.value)
        this.signupRequest.username = username;
        this.signupRequest.firstname = firstname;
        this.signupRequest.lastname = lastname;
        this.signupRequest.password = password;
        this.signupRequest.email = email;
        this.signupRequest.phone = phone;
        this.signupRequest.role = [];
        this.signupRequest.role.push(roles);

        await  this.userService.registerUser(this.signupRequest).then(res => {
            this.signupRequest = res;
            this.status = 'success';
            this.content = 'User Added Successfully';
            this.showToast(this.status, this.title, this.content);
            window.location.reload();
        }).catch(error => {
            this.content = 'Error';
            this.status = 'danger';
            this.showToast(this.status, this.title, this.content);
        });
        
        this.ref.close(this.signupRequest);
        

       
    }

    // onCancel
    onCancel() {
        
        this.ref.close();
    }

   
}