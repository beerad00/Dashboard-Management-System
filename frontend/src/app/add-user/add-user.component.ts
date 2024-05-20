import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { UserRequestDto } from '../models/user-request.dto';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {
  userRequest: UserRequestDto = {
    username: '',
    email: '',
    firstName: '',
    lastName: '',
    password: '',
    admin: false
  };
  confirmPassword: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    const currentUser = this.authService.getCurrentUser();
    if (currentUser && !currentUser.admin) {
      this.router.navigate(['/dashboard']);
    }
  }

  onSubmit() {
    if (this.userRequest.password !== this.confirmPassword) {
      console.error('Passwords do not match');
      return;
    }

    this.authService.register(this.userRequest).subscribe({
      next: () => {
        this.router.navigate(['/admin-dashboard']);
      },
      error: error => {
        console.error('Adding user failed', error);
      }
    });
  }
}
