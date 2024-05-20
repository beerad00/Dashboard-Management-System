import { Component } from '@angular/core';
import { UserRequestDto } from '../models/user-request.dto';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { OnInit } from '@angular/core';
import { createUserDto } from '../models/createUserDto';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  userRequest: createUserDto = {
    companyId: 0,  // Initialize to 0, will be updated in ngOnInit
    username: '',
    email: '',
    firstName: '',
    lastName: '',
    password: '',
    admin: false 
  };
  companyId: number | null = null;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    const storedCompanyId = localStorage.getItem('selectedCompanyId');
    this.companyId = storedCompanyId ? +storedCompanyId : null;
    if (this.companyId) {
      this.userRequest.companyId = this.companyId;
    } else {
      console.error('No company ID selected');
    }
  }

  onSubmit() {
    if (this.companyId) {
      this.authService.register(this.userRequest).subscribe({
        next: () => {
          this.router.navigate(['/login']);
        },
        error: (error) => {
          console.error('Registration failed', error);
        }
      });
    } else {
      console.error('No company ID selected');
    }
  }
}