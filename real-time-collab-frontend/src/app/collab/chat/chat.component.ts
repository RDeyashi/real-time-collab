import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';

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
