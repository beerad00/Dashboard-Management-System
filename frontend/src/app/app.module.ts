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
import { AddUserComponent } from './add-user/add-user.component';
import { UserRegistryComponent } from './user-registry/user-registry.component';
import { CompanySelectComponent } from './company-select/company-select.component';
import { CompanyService } from './services/company.service';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { EditProjectComponent } from './edit-project/edit-project.component';
import { AnnouncementsComponent } from './announcements/announcements.component';




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
  { path: "", redirectTo: "/login", pathMatch: "full" },
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    AdminDashboardComponent,
    UserDashboardComponent, // Declare the new component
    CompanySelectComponent,
    AddUserComponent,
    EditProjectComponent,
    AnnouncementsComponent,
    NavbarComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    RouterModule.forRoot(routes),
    HttpClientModule
  ],
  providers: [AuthService, CompanyService],
  bootstrap: [AppComponent]
})




export class AppModule { 


}