import {Injectable} from '@angular/core';
import {HttpClient,HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import { Emetteur } from './models/emetteurs';
import { Titre } from "./models/Titre";
import { Echeance } from "./models/Echeance";

@Injectable({
    providedIn: 'root',
  })

  export class Allservice {
      dette : string = 'http://localhost:8081/api';
      etl : string = 'http://localhost:8081/api';
      httpOptions={headers:new HttpHeaders({
        'Content-Type':'application/json'})}

      constructor(private http: HttpClient) {}

      //GET
        allEmetteurl(): Observable<Emetteur[]> { 
          return this.http.get<Emetteur[]>(this.dette+'/emetteur');
        }

        getListTitreById(id_E:number) : Observable<Titre[]> {
          return this.http.get<Titre[]>(`${this.dette}/emetteur/list/${id_E}`,this.httpOptions);
        }

        getEmetteurByid(id_E:number) : Observable<Emetteur>{
          return this.http.get<Emetteur>(this.dette+'/emetteur/'+id_E);
        }

        getAlltitre(): Observable<Titre[]> {
          return this.http.get<Titre[]>(this.dette+'/titre')
        }

        generateEcheancier(id_t:number):Observable<Echeance[]> {
          return this.http.get<Echeance[]>(this.dette+'/titre/generateEcheancierAnAn/'+id_t);
        }
        
        getTitreByid(id_t : number) : Observable<Titre>{
          return this.http.get<Titre>(this.dette+'/titre/'+id_t);
        }

      //PUT
        UpdateEmetteur(id_E:number,em : Emetteur):Observable<Emetteur>{
          return this.http.put<Emetteur>(this.dette+'/emetteur/'+id_E,em,this.httpOptions);
        }

        UpdateTitre(id_t:number,Ti :Titre):Observable<Titre>{
          return this.http.put<Titre>(this.dette+'/titre/'+id_t,Ti,this.httpOptions);
        }

      // DELETE
      deleteEmetteurById(id_E:number):Observable<null>{
        return this.http.delete<null>(this.dette+'/emetteur/'+id_E,this.httpOptions)
      }

      deleteTitreById(id_t:number):Observable<null>{
        return this.http.delete<null>(this.dette+'/titre/'+id_t,this.httpOptions)
      }

  }