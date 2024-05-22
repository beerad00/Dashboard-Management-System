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
<<<<<<< HEAD
  isCompanySelected: boolean = false;
  companyId: number | null = null;
=======
>>>>>>> origin/jreed-frontend

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    const currentUser = this.authService.getCurrentUser();
<<<<<<< HEAD
    const companyId = this.authService.getCurrentCompanyId();
    console.log(companyId, "companyId from navbar oninit");
    
=======
>>>>>>> origin/jreed-frontend
    if (currentUser) {
      this.isAdmin = currentUser.admin;
    }
  }
<<<<<<< HEAD

  logout(): void {
    this.authService.logout();
  }
=======
>>>>>>> origin/jreed-frontend
}