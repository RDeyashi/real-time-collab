import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-chat',
  imports: [
    CommonModule
  ],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.scss'
})
export class ChatComponent {
  selectedUser: number = 0
  USER: any = [
    {
      name: "Rabi Deyashi",
      lastMsg: "I'll be OOO",
      logo: ''
    },
    {
      name: "Deyashi Rabi",
      lastMsg: "I'll be OOO now",
      logo: ''
    },
    {
      name: "Rabi Deyashi",
      lastMsg: "I'll be OOO",
      logo: ''
    },
    {
      name: "Rabi Deyashi",
      lastMsg: "I'll be OOO",
      logo: ''
    },
    {
      name: "Rabi Deyashi",
      lastMsg: "I'll be OOO",
      logo: ''
    },
    {
      name: "Rabi Deyashi",
      lastMsg: "I'll be OOO",
      logo: ''
    }, {
      name: "Rabi Deyashi",
      lastMsg: "I'll be OOO",
      logo: ''
    },
    {
      name: "Rabi Deyashi",
      lastMsg: "I'll be OOO",
      logo: ''
    },
    {
      name: "Rabi Deyashi",
      lastMsg: "I'll be OOO",
      logo: ''
    }, {
      name: "Rabi Deyashi",
      lastMsg: "I'll be OOO",
      logo: ''
    },
    {
      name: "Rabi Deyashi",
      lastMsg: "I'll be OOO",
      logo: ''
    },
    {
      name: "Rabi Deyashi",
      lastMsg: "I'll be OOO",
      logo: ''
    }
  ]

  onClickUser(index: number) {
    this.selectedUser = index;
  }
}
