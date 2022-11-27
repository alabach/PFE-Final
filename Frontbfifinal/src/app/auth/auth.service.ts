import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {JwtResponse} from '../pages/all/models/jwt-response';
import {LoginRequest} from '../pages/all/models/login-request';

@Injectable({
    providedIn: 'root',
})
export class AuthService {

    private microservice: string = 'http://localhost:8080/api/auth';

    constructor(private http: HttpClient) { }

    login(loginRequest: LoginRequest): Observable<JwtResponse> {
        return this.http.post<JwtResponse>(this.microservice+'/signin', loginRequest);
    }
}
