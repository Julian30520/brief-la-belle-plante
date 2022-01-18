import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl: string;

  constructor(private http: HttpClient) {
    this.apiUrl = environment.apiUrl;
   }

   signup(newUser: User): Observable<any> {
    //  const body = {
    //   firstName: firstName,
    //   lastName: lastName,
    //   email: email,
    //   password: password
    //  };

    console.log("newUser : ", newUser);

    return this.http.post(`${this.apiUrl}/register`, newUser);
   }

   signin(email: string, password: string): Observable<any> {
    const body = {
      email: email,
      password: password
    };
    
    return this.http.post(`${this.apiUrl}/login`, body);
   }
}
