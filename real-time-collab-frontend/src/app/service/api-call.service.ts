import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiCallService {

  constructor(private http: HttpClient) { }

  apiBaseUrl = "http://localhost:8000/api/v1"

  public isLoggedIn = new BehaviorSubject<boolean>(false);
  currentLoggedInValue = this.isLoggedIn.asObservable();

  setLoggedInValue(value:boolean){
    console.log(value, typeof(value))
    this.isLoggedIn.next(value);
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
