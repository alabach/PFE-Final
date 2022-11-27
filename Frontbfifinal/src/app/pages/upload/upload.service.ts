import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
    providedIn: 'root',
  })

  export class UploadSrvice {
    dette : string = 'http://localhost:8031/api'

    constructor(private http: HttpClient) {}

     //POST
     fileDetails (formData:FormData) : any {
      return this.http.post(this.dette+'/etl/upload-data',formData).toPromise();
  }
  }