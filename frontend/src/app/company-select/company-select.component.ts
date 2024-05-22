import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CompanyService } from '../services/company.service';
import { AuthService } from '../services/auth.service';
import { CompanyDto } from '../models/company.dto';
import { FullUserDto } from '../models/full-user.dto';

@Component({
  selector: 'app-company-select',
  templateUrl: './company-select.component.html',
  styleUrls: ['./company-select.component.css']
})
export class CompanySelectComponent implements OnInit {
  companies: CompanyDto[] = [];
  selectedCompanyId: number | null = null;

  constructor(private companyService: CompanyService, private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.loadCompanies();
  }

  async loadCompanies(): Promise<void> {
    const currentUser = this.authService.getCurrentUser();
    if (currentUser) {
      try {
        this.companies = await this.authService.getCompaniesByUserId(currentUser.id);
      } catch (error) {
        console.error('Failed to fetch companies', error);
      }
    }
  }

  onSelectCompany() {
    if (this.selectedCompanyId) {
      console.log('Selected company from company-select:', this.selectedCompanyId);
      localStorage.setItem('selectedCompanyId', this.selectedCompanyId.toString());
      this.authService.setCurrentCompanyId(this.selectedCompanyId);
      this.router.navigate(['/announcements'], { queryParams: { companyId: this.selectedCompanyId } });
    }
  }
}
