import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl: string;

  constructor(private http: HttpClient) {
    this.apiUrl = environment.apiUrl;
   }

   signup(email: string, password: string): Observable<any> {
     const body = {
       email: email,
       password: password
     };

    return this.http.post(`${this.apiUrl}/register`, body);
   }
}
