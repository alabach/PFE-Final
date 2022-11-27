import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {User} from '../all/models/user';
import {SignupRequest} from '../all/models/SignupRequest'

@Injectable({
    providedIn: 'root',
})

export class UserService {

    private microservice_user: string = 'http://localhost:8080/auth/user';

    private lien: string = 'http://localhost:8080/api/auth/signup';

    constructor(private http: HttpClient) {
    }

    // ---------------- GET METHOD ----------------- //

    getAllUser(): Observable<User[]> {
          return this.http.get<User[]>(this.microservice_user);
    }


    // ---------------- POST METHOD ----------------- //

    addUser(user: User): Promise<User> {
        return this.http.post<User>(this.microservice_user, user).toPromise();
    }

    registerUser(signupRequest: SignupRequest) : Promise<SignupRequest>{
        return this.http.post<SignupRequest>(this.lien,signupRequest).toPromise();
    }

    getUserById(id: number): Observable<User> {
        return this.http.get<User>(this.microservice_user + '/' + id);
    }

    // ---------------- PUT METHOD ----------------- //

    editUser(user: User): Promise<User> {
        return this.http.put<User>(this.microservice_user, user).toPromise();
    }

    // ---------------- DELETE METHOD ----------------- //

    deleteUser(id: number): Observable<null> {
        return this.http.delete<null>(this.microservice_user + '/' + id);
    }
}
