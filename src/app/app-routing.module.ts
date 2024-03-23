import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { ErrorComponent } from './error/error.component';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import { GuestGuard } from './guest.guard';

const routes: Routes = [
  {path:'',pathMatch:'full',redirectTo:'/home'},
  {path:'home',component:HomeComponent},
  {path:'login', component:LoginComponent,canActivate:[GuestGuard]},
  {path:'register', component:RegisterComponent,canActivate:[GuestGuard]},
  {path:'profile',component:ProfileComponent,canActivate:[AuthGuard]},
  {path:'**',component:ErrorComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers:[AuthGuard,AuthService,GuestGuard]
})
export class AppRoutingModule { }
