import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { UserRequestDto } from '../../models/user-request.dto';
import { createUserDto } from '../../models/createUserDto';
import { CompanyService } from 'src/app/services/company.service';

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
  passwordError: boolean = false;
  emailAvailability: boolean = true;
  emailError: boolean = true;

  constructor(private authService: AuthService, private router: Router, private companyService: CompanyService) {}

  ngOnInit(): void {
    this.companyId = this.authService.getCurrentCompanyId();
  }

  async onSubmit() {
    if (this.userRequest.password !== this.confirmPassword) {
      this.passwordError = true;
      console.error('Passwords do not match');
      return;
    }
  
    const emailTaken = await this.checkEmailAvailability(this.userRequest.email);
    this.emailAvailability = !emailTaken;
  
    if (!this.emailAvailability) {
      console.error('Email Taken');
      return;
    }

    if (this.companyId) {
      try {
        this.userRequest.companyId = this.companyId;
        await this.authService.register(this.userRequest);
        console.log('User added successfully', this.userRequest);
        this.navigateToUsers();
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

  async checkEmailAvailability(email: string): Promise<boolean> {
    if (!this.companyId) {
      console.error('No company ID selected');
      return false;
    }
  
    try {
      const users = await this.companyService.getUsersByCompanyId(this.companyId);
      const userEmails = users.map(user => user.profile.email);
  
      console.log('User Emails:', userEmails);
      console.log('Checking Email:', email);
  
      return userEmails.includes(email);
    } catch (error) {
      console.error('Error fetching users:', error);
      return false;
    }
  }
}