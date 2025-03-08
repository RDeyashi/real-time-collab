import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms'
import { EncryptDecryptService } from '../service/encrypt-decrypt.service';
import { ApiCallService } from '../service/api-call.service';

@Component({
  selector: 'app-signup',
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss',
  providers: [ApiCallService]
})
export class SignupComponent {
  constructor(
    private encDecService: EncryptDecryptService,
    private apiCallService: ApiCallService,
    private route: Router
  ) { }
  signup: FormGroup = new FormGroup({
    userName: new FormControl(""),
    userEmail: new FormControl("", [Validators.email]),
    password: new FormControl("", [Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)])
  })

  async onClickSignUp() {
    const encPaswd = await this.encDecService.encryptPassword(this.signup.value.password)
    this.signup.get("password")?.setValue(encPaswd)

    this.apiCallService.signUp(this.signup.value).subscribe({
      next: (response: any) => {
        if (!response.error) {
          console.log(response)
          this.route.navigate(['/signin'])
        }
      },
      error: (error:any) => {
        console.error(error.error.message)
      }
    })
  }
}
