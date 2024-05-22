import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { CredentialsDto } from '../models/credentials.dto';
import { FullUserDto } from '../models/full-user.dto';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  credentials: CredentialsDto = {
    username: '',
    password: ''
  };

  errorMessage: string = '';
<<<<<<< HEAD
=======
  currentUser: any;
>>>>>>> origin/jreed-frontend

  constructor(private authService: AuthService, private router: Router) {}

  async onSubmit(): Promise<void> {
    try {
      const response = await this.authService.login(this.credentials);
      console.log('Login response:', response);
      if (response && response.profile) {
        if (response.admin) {
          this.router.navigate(['/select-company']); // Redirect to company selection page for admins
        } else {
<<<<<<< HEAD
          this.router.navigate(['/announcements']); // Redirect to user dashboard for non-admins
=======
          this.router.navigate(['/user-dashboard']); // Redirect to user dashboard for non-admins
>>>>>>> origin/jreed-frontend
        }
      } else {
        console.error('Unexpected response structure:', response);
        this.errorMessage = 'Unexpected response structure.';
      }
    } catch (error) {
      console.error('Login failed', error);
      this.errorMessage = 'Login failed. Please check your credentials and try again.';
    }
  }
<<<<<<< HEAD
=======

  setUser() {
    const userId = this.currentUser?.id;
    if (userId !== undefined && userId !== null) {
      localStorage.setItem('currentUser', userId.toString());
    } else {
      console.error('User ID is undefined or null');
    }
  }
>>>>>>> origin/jreed-frontend
}