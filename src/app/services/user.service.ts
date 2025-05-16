import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { User } from '../interfaces/user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private AppUrl: string;
  private ApiUrl: string;


  constructor(private http: HttpClient) {
    this.AppUrl = environment.apiUrl
    this.ApiUrl = 'api/user/register'
   }

   signIn(user:User): Observable<any>{
    return this.http.post(`${this.AppUrl}${this.ApiUrl}`, user)
   }
}
