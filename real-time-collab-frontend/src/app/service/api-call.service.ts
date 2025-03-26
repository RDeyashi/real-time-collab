import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class ApiCallService {

  constructor(private http: HttpClient) { }

  apiBaseUrl = "http://localhost:8000/api/v1"

  public isLoggedIn = new BehaviorSubject<boolean>(false);
  currentLoggedInValue = this.isLoggedIn.asObservable();

  setLoggedInValue(value: boolean) {
    console.log(value, typeof (value))
    this.isLoggedIn.next(value);
  }

  decodeToken(token: string) {
    try {
      const decodedToken = jwtDecode(token)
      return decodedToken;
    } catch (error) {
      console.error('Error decoding token', error);
      return null;
    }
  }

  signUp(payload: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    })
    return this.http.post(`${this.apiBaseUrl}/users`, payload, { headers })
  }

  signin(payload: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    })
    return this.http.post(`${this.apiBaseUrl}/signin`, payload, { headers })
  }
}
