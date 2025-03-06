import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-collab',
  imports: [
    RouterModule,
    CommonModule
  ],
  templateUrl: './collab.component.html',
  styleUrl: './collab.component.scss'
})
export class CollabComponent {
  isChatActive: boolean = false
  currentUrl: string = '';
  constructor(private router: Router) { }

  ngOnInit(): void {
    this.currentUrl = this.router.url.split('/')[2]
    console.log(this.currentUrl)
    this.isChatActive = this.currentUrl == 'chat' ? true : false
  }
}
