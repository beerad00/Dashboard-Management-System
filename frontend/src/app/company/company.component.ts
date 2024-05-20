import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css']
})
export class CompanyComponent {
  userCompanies: any[] = [];

  constructor(private authService: AuthService) {
  }

  ngOnInit(): void {
    
  }
 }
