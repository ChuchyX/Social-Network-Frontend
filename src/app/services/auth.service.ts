import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, tap } from 'rxjs';
import { RegisterUserDto } from '../models/RegisterUserDto';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  private _refresh = new Subject<void>();

  get refresh() {
    return this._refresh;
  }

  public register(user: RegisterUserDto): Observable<any> {
    return this.http.post<any>(
      'https://localhost:7190/api/Auth/register',
      user
    );
  }

  public login(user: User): Observable<string> {
    return this.http.post('https://localhost:7190/api/Auth/login', user, {
      responseType: 'text',
    });
  }
}
