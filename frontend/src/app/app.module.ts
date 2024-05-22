import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from './services/auth.service';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { Routes } from '@angular/router';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { AddUserComponent } from './users/add-user/add-user.component';
import { CompanySelectComponent } from './company-select/company-select.component';
import { CompanyService } from './services/company.service';
import { EditProjectComponent } from './teams/projects/edit-project/edit-project.component';
import { AnnouncementsComponent } from './announcements/announcements.component';
import { TeamsComponent } from './teams/teams.component';
import { ProjectsComponent } from './teams/projects/projects.component';
import { UsersComponent } from './users/users.component';
import { AnnouncementCardComponent } from './announcements/announcement-card/announcement-card.component';
import { TeamCardComponent } from './teams/team-card/team-card.component';
import { AddTeamComponent } from './teams/add-team/add-team.component';
import { AddProjectComponent } from './teams/projects/add-project/add-project.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';





const routes: Routes = [ 
  { path: "announcements", component: AnnouncementsComponent},
  { path: "edit-project", component: EditProjectComponent},
  { path: "company-select", component: CompanySelectComponent},
  { path: "add-user", component: AddUserComponent},
  { path: "login", component: LoginComponent},
  { path: "teams", component: TeamsComponent},
  { path: "projects", component: ProjectsComponent},
  { path: 'projects/:teamId', component: ProjectsComponent },
  { path: "users", component: UsersComponent},
  { path: "", redirectTo: "/login", pathMatch: "full" },
  { path: '**', component: PageNotFoundComponent },

];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    CompanySelectComponent,
    AddUserComponent,
    EditProjectComponent,
    AnnouncementsComponent,
    NavbarComponent,
    TeamsComponent,
    ProjectsComponent,
    UsersComponent,
    AnnouncementCardComponent,
    TeamCardComponent,
    AddTeamComponent,
    AddProjectComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    RouterModule.forRoot(routes),
    HttpClientModule
  ],
  exports: [RouterModule],
  providers: [AuthService, CompanyService],
  bootstrap: [AppComponent]
})




export class AppModule { 


}