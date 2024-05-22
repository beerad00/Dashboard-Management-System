import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { UserRequestDto } from '../../models/user-request.dto';
import { createUserDto } from '../../models/createUserDto';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {
  userRequest: createUserDto = {
    companyId: 0,  // Initialize to 0, will be updated in ngOnInit
    username: '',
    email: '',
    firstName: '',
    lastName: '',
    password: '',
    phone: '',
    admin: false
  };
  confirmPassword: string = '';
  companyId: number | null = null;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.companyId = Number(localStorage.getItem('selectedCompanyId'));
   
  }

  async onSubmit() {
    if (this.userRequest.password !== this.confirmPassword) {
      console.error('Passwords do not match');
      return;
    }

    if (this.companyId) {
      try {
        this.userRequest.companyId = this.companyId;
        await this.authService.register(this.userRequest);
        console.log('User added successfully', this.userRequest);
        this.router.navigate(['/users']);
      } catch (error) {
        console.error('Adding user failed', error);
      }
    } else {
      console.error('No company ID selected');
    }
  }

  navigateToUsers() {
    this.router.navigate(['/users']);
  }
}