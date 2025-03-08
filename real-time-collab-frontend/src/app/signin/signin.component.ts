import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { EncryptDecryptService } from '../service/encrypt-decrypt.service';

@Component({
  selector: 'app-signin',
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.scss'
})
export class SigninComponent {
  constructor(private encDecService: EncryptDecryptService){}
  signin:FormGroup = new FormGroup({
    email: new FormControl("", [Validators.email]),
    password: new FormControl("", [Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)])
  })

  async onClickSignIn(){
    const encPaswd = await this.encDecService.encryptPassword(this.signin.value.password)
    this.signin.get("password")?.setValue(encPaswd)

    console.log(this.signin.value)
  }
}
