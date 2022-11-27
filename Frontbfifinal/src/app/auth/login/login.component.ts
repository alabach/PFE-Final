import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../auth.service';
import {JwtResponse} from '../../pages/all/models/jwt-response';
import {TokenStorageService} from '../token-storage.service';
import {Router} from '@angular/router';
import {CurUser} from '../../pages/all/models/CurUser';
import {NbComponentStatus, NbGlobalPhysicalPosition, NbGlobalPosition, NbToastrService} from '@nebular/theme';


@Component({
    selector: 'ngx-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
  })

export class LoginComponent implements OnInit {

  jwtResponse: JwtResponse;

  // forms-Control
  loginForm: FormGroup;

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
                private authService: AuthService,
                private tokenStorageService: TokenStorageService,
                private toasterService: NbToastrService,
                private router: Router){}
    
    ngOnInit(): void {
      this.tokenStorageService.signOut();
        this.loginForm = this.fb.group({
            username: ['', Validators.required],
            password: ['', [Validators.required, Validators.maxLength(8), Validators.minLength(8)]],
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

  login() {
    this.authService.login(this.loginForm.value).subscribe( res => {
        this.jwtResponse = res;
        const user = new CurUser();
        user.id = res.id;
        user.username = res.username;
        user.email = res.email;
        user.roles= res.roles;
        user.firstname = res.firstname;
        user.lastname = res.lastname;
        user.phone = res.phone;
        this.tokenStorageService.saveUser(user);
        this.tokenStorageService.saveToken(res.jwt);
        if (this.jwtResponse.roles.includes('COLLABORATOR')) {
            
            this.router.navigate(['/pages/all/emetteur']);
        }if (this.jwtResponse.roles.includes('ADMIN')) {
            
            this.router.navigate(['/pages/user/all']);
        }
         else {
            this.router.navigate(['/pages/all/emetteur']);
        }
    }, error => {
        this.content = 'Username or Password Invalid';
        this.status = 'danger';
        this.showToast(this.status, this.title, this.content);
        this.loginForm.reset();
    });
}
}