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
  credentials: CredentialsDto = { username: '', email: '', password: '' };
  errorMessage = '';
  currentUser: any;

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    this.authService.login(this.credentials).subscribe({
      next: (response: FullUserDto) => {
        console.log('Login response:', response);
        this.currentUser = response;
        this.setUser();
        if (response) {
          this.router.navigate(['/company-select']);
          /*
          if (response.admin) {
            this.router.navigate(['/admin-dashboard']);
          } else {
            this.router.navigate(['/dashboard']);
          }
          */
        } else {
          console.error('Unexpected response structure:', response);
          this.errorMessage = 'Unexpected response structure.';
        }
      },
      error: error => {
        console.error('Login failed', error);
        this.errorMessage = 'Login failed. Please check your credentials.';
      }
    });
  }

  setUser() {
    const userId = this.currentUser?.id;
    if (userId !== undefined && userId !== null) {
      localStorage.setItem('currentUser', userId.toString());
    } else {
      console.error('User ID is undefined or null');
    }
  }
}