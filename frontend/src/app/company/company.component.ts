import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css']
})
export class CompanyComponent {
  userCompanies: any[] = [];
  currentUser: any;
  private apiUrl = 'http://localhost:8080/users';

  constructor(private authService: AuthService,
              private http: HttpClient) {
  }

  ngOnInit(): void {
    this.currentUser = localStorage.getItem('currentUser');
    this.getUserCompanies();
  }

  getUserCompanies() {
    this.authService.getUserCompanies().subscribe(
      (response: any) => {
        console.log(JSON.stringify(response))
    },
    (error) => {
      console.log(error)
    }
  );
  }

 }
