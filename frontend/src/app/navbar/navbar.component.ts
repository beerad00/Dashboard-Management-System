import { Component, ElementRef, ViewChild, Renderer2 } from '@angular/core';
import { OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  @ViewChild('toggleButton') toggleButton!: ElementRef;
  @ViewChild('navbarMenu') navbarMenu!: ElementRef;
  showMenu: boolean = false;
  isAdmin: boolean = false;
  isCompanySelected: boolean = false;
  isLoggedIn: boolean = false;
  companyId: number | null = null;
  showUsers: boolean = false;
  showCompany: boolean = false;
  currentUser: any;


  constructor(private authService: AuthService, private renderer: Renderer2) {}

  ngOnInit(): void {
    this.currentUser = this.authService.getCurrentUser();
    const companyId = this.authService.getCurrentCompanyId();
    if(this.currentUser) {
      this.isAdmin = this.currentUser.admin;
      if(!this.currentUser) {
        this.showUsers = true;
        this.showCompany = true;
      }
    }
  }

  toggleMenu() {
    this.showMenu = !this.showMenu;
    if (this.showMenu) {
      this.renderer.addClass(this.navbarMenu.nativeElement, 'block');
      this.renderer.removeClass(this.navbarMenu.nativeElement, 'hidden');
    } else {
      this.renderer.addClass(this.navbarMenu.nativeElement, 'hidden');
      this.renderer.removeClass(this.navbarMenu.nativeElement, 'block');
    }
  }



  logout(): void {
    this.isCompanySelected = false;
    this.isLoggedIn = false;
    this.authService.logout();
  }
}