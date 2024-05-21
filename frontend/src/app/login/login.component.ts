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

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    this.authService.login(this.credentials).subscribe({
      next: (response) => {
        console.log('Login response:', response);
        if (response && response.profile) {
          if (response.admin) {
            this.router.navigate(['/select-company']); // Redirect to company selection page for admins
          } else {
            this.router.navigate(['/user-dashboard']); // Redirect to user dashboard for non-admins
          }
        } else {
          console.error('Unexpected response structure:', response);
          this.errorMessage = 'Unexpected response structure.';
        }
      },
      error: (error) => {
        console.error('Login failed', error);
        this.errorMessage = 'Login failed. Please check your credentials and try again.';
      }
    });
  }
}