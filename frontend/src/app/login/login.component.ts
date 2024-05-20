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

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    this.authService.login(this.credentials).subscribe({
      next: (response: FullUserDto) => {
        console.log('Login response:', response);
        if (response) {
          if (response.admin) {
            this.router.navigate(['/admin-dashboard']);
          } else {
            this.router.navigate(['/dashboard']);
          }
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
}