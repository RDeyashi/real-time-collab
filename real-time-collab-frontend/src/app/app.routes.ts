import { Routes } from '@angular/router';
import { SignupComponent } from './signup/signup.component';
import { SigninComponent } from './signin/signin.component';
import { ChatComponent } from './collab/chat/chat.component';
import { CollabComponent } from './collab/collab.component';
import { authGuard } from './guard/auth.guard';

export const routes: Routes = [
    { path: '', redirectTo: 'signin', pathMatch: 'full' },
    { path: 'signup', component: SignupComponent },
    { path: 'signin', component: SigninComponent },
    {
        path: 'collab',
        component: CollabComponent,
        children: [
            { path: '', redirectTo: 'chat', pathMatch: 'full' },
            { path: 'chat', component: ChatComponent }
        ],
        canActivate: [authGuard]
    }
];
