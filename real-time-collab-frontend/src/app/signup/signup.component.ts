import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms'
import { EncryptDecryptService } from '../service/encrypt-decrypt.service';

@Component({
  selector: 'app-signup',
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {
  constructor(private encDecService: EncryptDecryptService){}
  signup: FormGroup = new FormGroup({
    userName: new FormControl(""),
    userEmail: new FormControl("", [Validators.email]),
    password: new FormControl("", [Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)])
  })

  async onClickSignUp(){
    const encPaswd = await this.encDecService.encryptPassword(this.signup.value.password)
    this.signup.get("password")?.setValue(encPaswd)
    console.log(this.signup.value)
  }
}
