import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, tap } from 'rxjs';
import { ReturnUser } from '../models/ReturnUser';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

   private _refresh = new Subject<void>();

   constructor(private http: HttpClient) { }

   get refresh()
   {
      return this._refresh;
   }

   
   public getMe(): Observable<any>{
      return this.http.get('https://localhost:7190/api/Auth/getme').pipe(
         tap(() => {
            this._refresh.next();
         })
      )
   }

   public getPPicture(){
      return this.http.get('https://localhost:7190/api/Auth/getppicture', {responseType:'blob'});
   }
}
