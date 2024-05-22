import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AddUserComponent } from './users/add-user/add-user.component';
import { CompanySelectComponent } from './company-select/company-select.component';
import { AddTeamComponent } from './teams/add-team/add-team.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'select-company', component: CompanySelectComponent },
  { path: 'add-user', component: AddUserComponent },
  { path: 'add-team', component: AddTeamComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }