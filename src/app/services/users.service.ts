import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ReturnUser } from '../models/ReturnUser';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

   constructor(private http: HttpClient) { }

   public getMe(): Observable<any>{
      return this.http.get('https://localhost:7190/api/Auth/getme');
   }

   public getPPicture(){
      return this.http.get('https://localhost:7190/api/Auth/getppicture', {responseType:'blob'});
   }
}
