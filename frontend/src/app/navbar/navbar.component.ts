import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isAdmin: boolean = false;
  isCompanySelected: boolean = false;
  isLoggedIn: boolean = false;
  companyId: number | null = null;
  showUsers: boolean = false;
  showCompany: boolean = false;


  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    const currentUser = this.authService.getCurrentUser();
    const companyId = this.authService.getCurrentCompanyId();
    if(currentUser) {
      this.isAdmin = currentUser.admin;
      if(!currentUser) {
        this.showUsers = true;
        this.showCompany = true;
      }
    }
  }

  logout(): void {
    this.isCompanySelected = false;
    this.isLoggedIn = false;
    this.authService.logout();
  }
}