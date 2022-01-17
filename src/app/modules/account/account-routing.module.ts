import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { any } from 'underscore';
import { PageForgotPasswordComponent } from './pages/page-forgot-password/page-forgot-password.component';
import { PageResetPasswordComponent } from './pages/page-reset-password/page-reset-password.component';
import { PageSigninComponent } from './pages/page-signin/page-signin.component';
import { PageSignupnComponent } from './pages/page-signupn/page-signupn.component';

const routes: Routes = [
  { path: '', redirectTo: 'signin', pathMatch: 'full' },
  { path: 'signin', component: PageSigninComponent },
  { path: 'signup', component: PageSignupnComponent },
  { path: 'forgot-password', component: PageForgotPasswordComponent },
  { path: 'reset-password', component: PageResetPasswordComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountRoutingModule { }
