import { Component } from '@angular/core';
import { UserRequestDto } from '../models/user-request.dto';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  userRequest: UserRequestDto = {
    username: '',
    email: '',
    firstName: '',
    lastName: '',
    password: '',
    admin: false 
  };

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    this.authService.register(this.userRequest).subscribe(
      response => {
        this.router.navigate(['/login']);
      },
      error => {
        console.error('Registration failed', error);
      }
    );
  }
}