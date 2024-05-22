import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
<<<<<<< HEAD
import { AddUserComponent } from './users/add-user/add-user.component';
import { UserRegistryComponent } from './user-registry/user-registry.component';
import { CompanySelectComponent } from './company-select/company-select.component';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';

=======
import { AddUserComponent } from './add-user/add-user.component';
import { UserRegistryComponent } from './user-registry/user-registry.component';
import { CompanySelectComponent } from './company-select/company-select.component';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { AddTeamComponent } from './add-team/add-team.component';
>>>>>>> origin/jreed-frontend

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'admin-dashboard', component: AdminDashboardComponent },
  { path: 'user-dashboard', component: UserDashboardComponent }, // New route for user dashboard
  { path: 'select-company', component: CompanySelectComponent },
  { path: 'add-user', component: AddUserComponent },
<<<<<<< HEAD
=======
  { path: 'add-team', component: AddTeamComponent },
>>>>>>> origin/jreed-frontend
  { path: '', redirectTo: '/login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }