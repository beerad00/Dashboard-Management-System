import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AddUserComponent } from './users/add-user/add-user.component';
import { UserRegistryComponent } from './user-registry/user-registry.component';
import { CompanySelectComponent } from './company-select/company-select.component';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { AddTeamComponent } from './teams/add-team/add-team.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'admin-dashboard', component: AdminDashboardComponent },
  { path: 'user-dashboard', component: UserDashboardComponent }, // New route for user dashboard
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