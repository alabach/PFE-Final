import {Component, OnInit} from '@angular/core';
import {UserService} from '../user.service';
import {User} from '../../all/models/user';
import {faTrash, faPenToSquare, faRetweet} from '@fortawesome/free-solid-svg-icons';
import {
    NbComponentStatus,
    NbDialogService,
    NbGlobalPhysicalPosition,
    NbGlobalPosition,
    NbToastrService,
} from '@nebular/theme';
import {HttpErrorResponse} from '@angular/common/http';
import {AddUserComponent} from '../add-user/add-user.component';
import {EditUserComponent} from '../edit-user/edit-user.component';
import {FormBuilder, FormGroup} from '@angular/forms';
import {TokenStorageService} from '../../../auth/token-storage.service';
import {Router} from '@angular/router';



@Component({
    selector: 'ngx-all-user',
    styleUrls: ['./all-user.component.scss'],
    templateUrl: './all-user.component.html',
})

export class AllUserComponent implements OnInit {
    userList: User[] = [];
    noFilterUserList: User[] = [];
    paginationConfig: any;
    currentUser: User;

    // forms-Control
    researchForm: FormGroup;

    // font-awesome-icons
    faTrash = faTrash;
    faPenToSquare = faPenToSquare;
    faRetweet = faRetweet;


    // Toaster Config
    destroyByClick = true;
    duration = 2000;
    hasIcon = true;
    position: NbGlobalPosition = NbGlobalPhysicalPosition.TOP_RIGHT;
    preventDuplicates = false;
    status: NbComponentStatus = 'success';
    content: string;
    title = 'HI there!';


    constructor(private userService: UserService,
        private toasterService: NbToastrService,
        private dialogService: NbDialogService,
        private fb: FormBuilder,
        private tokenStorageService: TokenStorageService,
        private router: Router){}

    ngOnInit(): void {
        this.currentUser = this.tokenStorageService.getUser();
        
        if (this.currentUser.roles[0].toString() !== 'ADMIN') {
             this.router.navigate(['login']);
        } else {
            this.researchForm = this.fb.group({
                firstname: [''],
                lastname: [''],
                role: [''],
            });

            this.paginationConfig = {
                itemsPerPage: 10,
                currentPage: 1,
                totalItems: this.userList.length,
            };

            this.userService.getAllUser().subscribe(res => {
                this.userList = res;
                this.noFilterUserList = res;
                this.status = 'success';
                this.content = 'Users Number: ' + this.userList.length;
                this.showToast(this.status, this.title, this.content);
                
                
            }, (error: HttpErrorResponse) => {
                this.status = 'danger';
                this.content = 'Error Loading Users';
                this.showToast(this.status, this.title, this.content);
            });
        }
        
    }
    // Pagination
    pageChanged(event) {
        this.paginationConfig.currentPage = event;
    }

    // On Reset Search
    onResetSearch() {
        this.researchForm.reset();
        this.userList = this.noFilterUserList;
    }

    // On Search
    onSearchChange() {
        this.paginationConfig.currentPage = 1;
        const {firstname, lastname, role} = this.researchForm.value;
        this.userList = this.noFilterUserList;

        if (firstname !== '') {
            this.userList = this.userList.filter(x => x.firstname.startsWith(firstname.toLowerCase()));
        }
        if (lastname !== '') {
            this.userList = this.userList.filter(x => x.lastname.startsWith(lastname.toLowerCase()));
        }
        if (role !== '' && role !== 'all') {
            this.userList = this.userList.filter(x => x.roles[0].name.includes(role));
        }
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

    // On Click Add User
    onAddUser() {
        this.dialogService.open(AddUserComponent, {
            closeOnBackdropClick: true,
            closeOnEsc: true,
            hasScroll: true,
        }).onClose.subscribe(
            (user: User) => {
                if (user.id !== null) {
                    this.userList.push(user);
                }
            },
        );
    }

    //On Click Edit User
    onEditUser(id: number) {
        this.dialogService.open(EditUserComponent, {
            context: {
                id: id,
                currentUser: this.currentUser,
            },
            closeOnBackdropClick: true,
            closeOnEsc: true,
            hasScroll: true,
        }).onClose.subscribe(
            (user: User) => {
                this.noFilterUserList = this.noFilterUserList.filter(x => x.id !== user.id);
                this.noFilterUserList.push(user);
                this.userList = this.noFilterUserList;
            },
        );
    }

    // OnClick Delete User
    onDeleteUser(id: number) {
        this.userService.deleteUser(id).subscribe(res => {
            this.status = 'success';
            this.content = 'User deleted';
            this.showToast(this.status, this.title, this.content);
            this.userList = this.userList.filter(x => x.id !== id);
            this.noFilterUserList = this.noFilterUserList.filter(x => x.id !== id);
        }, (error: HttpErrorResponse) => {
            this.status = 'danger';
            this.content = 'Error Deleting User';
            this.showToast(this.status, this.title, this.content);
        });
    }
}