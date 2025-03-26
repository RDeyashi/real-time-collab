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
  }
  clickLogOut(){
    localStorage.clear();
    this._apiCallS.setLoggedInValue(false)
    this.router.navigate(['/signin'])
  }
}
