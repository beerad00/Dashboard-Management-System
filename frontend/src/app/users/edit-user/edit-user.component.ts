import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { createUserDto } from 'src/app/models/createUserDto';
import { FullUserDto } from 'src/app/models/full-user.dto';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent {
  userRequest: createUserDto = {
    companyId: 0,
    username: '',
    email: '',
    firstName: '',
    lastName: '',
    password: '',
    phone: '',
    admin: false,
  };
  confirmPassword: string = '';
  companyId: number | null = null;
  passwordError: boolean = false;
  userId: number | null = null;

  constructor(private authService: AuthService, private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const passedId = params['userId'];
      if (passedId) {
        this.userId = passedId;
      }
    });
    console.log(this.userRequest, "userRequest")
    this.companyId = this.authService.getCurrentCompanyId();
    
   
  }

  async onSubmit() {
    if (this.userRequest.password !== this.confirmPassword) {
      this.passwordError = true;
      console.error('Passwords do not match');
      return;
    }

    if (this.companyId) {
      try {
        this.userRequest.companyId = this.companyId;
        await this.authService.updateUser(this.userId!, this.userRequest);
        console.log('User edited', this.userRequest);
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

}
