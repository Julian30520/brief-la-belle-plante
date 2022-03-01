import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AccountRoutingModule} from './account-routing.module';
import {PageSignupComponent} from './pages/page-signup/page-signup.component';
import {PageSigninComponent} from './pages/page-signin/page-signin.component';
import {PageForgotPasswordComponent} from './pages/page-forgot-password/page-forgot-password.component';
import {PageResetPasswordComponent} from './pages/page-reset-password/page-reset-password.component';


@NgModule({
  declarations: [
    PageSignupComponent,
    PageSigninComponent,
    PageForgotPasswordComponent,
    PageResetPasswordComponent
  ],
  imports: [
    CommonModule,
    AccountRoutingModule
  ]
})
export class AccountModule {
}
