import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiCallService } from '../service/api-call.service';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  isLoggedIn!: boolean  
  constructor(
    private router: Router,
    private _apiCallS: ApiCallService
  ){}

  ngOnInit(): void {
    this._apiCallS.currentLoggedInValue.subscribe(value => {
      console.log(value)
      this.isLoggedIn = value
    })
    this.isLoggedIn = localStorage.getItem('access-token') ? true : false
  }
  clickLogOut(){
    localStorage.clear();
    this._apiCallS.setLoggedInValue(false)
    this.router.navigate(['/signin'])
  }
}
