
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutPassportComponent } from 'src/app/layout/passport/passport.component';
import { LoginComponent } from './login/login.component';


const routes: Routes = [
  // passport
  {
    path: '',
    component: LayoutPassportComponent,
    children: [
      { path: 'login', component: LoginComponent },
      // { path: 'register', component: RegisterComponent },
      // { path: 'verify-email', component: VerifyEmailComponent },
      // { path: 'forgot-password', component: ForgotPasswordComponent },
      // { path: 'reset-password', component: ResetPasswordComponent }

    ]
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoginRoutingModule { }