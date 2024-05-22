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
  companyId: number | null = null;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    const currentUser = this.authService.getCurrentUser();
    const companyId = this.authService.getCurrentCompanyId();
    console.log(companyId, "companyId from navbar oninit");
    
    if (currentUser) {
      this.isAdmin = currentUser.admin;
    }
  }

  logout(): void {
    this.authService.logout();
  }
}