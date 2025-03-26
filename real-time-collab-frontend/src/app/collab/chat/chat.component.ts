import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ApiCallService } from '../../service/api-call.service';

@Component({
  selector: 'app-chat',
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.scss'
})
export class ChatComponent {
  messageForm: FormGroup = new FormGroup({
    messageText: new FormControl("")
  })
  selectedUser: number = 0;
  //messageText!: string | null
  MESSAGE: any = [
    {
      message: 'Hi User',
      user: 'Rabi Deyashi'
    }
  ]
  USER: any = [
    {
      name: "Rabi Deyashi",
      lastMsg: "I'll be OOO",
      logo: 'assets/user-regular.svg'
    },
    {
      name: "Deyashi Rabi",
      lastMsg: "I'll be OOO now",
      logo: ''
    },
  ]

  constructor(
    private _apiCallS: ApiCallService
  ){}

  ngOnInit(): void {
    const accessToken = localStorage.getItem('access-token');
    const jwtResponse = this._apiCallS.decodeToken(accessToken!)
    console.log(jwtResponse)
  }

  onClickUser(index: number) {
    this.selectedUser = index;
  }

  sendMessage() {
    console.log(this.messageForm.value.messageText)
    this.MESSAGE.push({
      message: this.messageForm.value.messageText,
      user: "self"
    })
    this.messageForm.get("messageText")?.setValue("");
  }
}
