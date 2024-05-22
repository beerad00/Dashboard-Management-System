import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from './services/auth.service';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { Routes } from '@angular/router';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
<<<<<<< HEAD
import { AddUserComponent } from './users/add-user/add-user.component';
=======
import { AddUserComponent } from './add-user/add-user.component';
import { TeamsComponent } from './teams/teams.component';
>>>>>>> origin/jreed-frontend
import { UserRegistryComponent } from './user-registry/user-registry.component';
import { CompanySelectComponent } from './company-select/company-select.component';
import { CompanyService } from './services/company.service';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
<<<<<<< HEAD
import { EditProjectComponent } from './teams/projects/edit-project/edit-project.component';
import { AnnouncementsComponent } from './announcements/announcements.component';
import { TeamsComponent } from './teams/teams.component';
import { ProjectsComponent } from './teams/projects/projects.component';
import { UsersComponent } from './users/users.component';
import { AnnouncementCardComponent } from './announcements/announcement-card/announcement-card.component';
import { TeamCardComponent } from './teams/team-card/team-card.component';




const routes: Routes = [ 
  { path: "announcements", component: AnnouncementsComponent},
  { path: "edit-project", component: EditProjectComponent},
  { path: "user-dashboard", component: UserDashboardComponent},
  { path: "company-select", component: CompanySelectComponent},
  { path: "add-user", component: AddUserComponent},
  { path: "admin-dashboard", component: AdminDashboardComponent},
  { path: "dashboard", component: DashboardComponent},
  { path: "register", component: RegisterComponent},
  { path: "login", component: LoginComponent},
  { path: "teams", component: TeamsComponent},
  { path: "projects", component: ProjectsComponent},
  { path: 'projects/:teamId', component: ProjectsComponent },
  { path: "users", component: UsersComponent},
  { path: "", redirectTo: "/login", pathMatch: "full" },
];

@NgModule({
  declarations: [
    AppComponent,
=======
import { EditProjectComponent } from './edit-project/edit-project.component';
import { AddTeamComponent } from './add-team/add-team.component';


@NgModule({
  declarations: [
    AppComponent,
    TeamsComponent,
>>>>>>> origin/jreed-frontend
    LoginComponent,
    RegisterComponent,
    AdminDashboardComponent,
    UserDashboardComponent, // Declare the new component
    CompanySelectComponent,
    AddUserComponent,
    EditProjectComponent,
<<<<<<< HEAD
    AnnouncementsComponent,
    NavbarComponent,
    TeamsComponent,
    ProjectsComponent,
    UsersComponent,
    AnnouncementCardComponent,
    TeamCardComponent,
=======
    AddTeamComponent
>>>>>>> origin/jreed-frontend
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
<<<<<<< HEAD
    RouterModule.forRoot(routes),
    HttpClientModule
  ],
  exports: [RouterModule],
  providers: [AuthService, CompanyService],
  bootstrap: [AppComponent]
})




export class AppModule { 


}
=======
    HttpClientModule
  ],
  providers: [AuthService, CompanyService],
  bootstrap: [AppComponent]
})
export class AppModule { }
>>>>>>> origin/jreed-frontend
