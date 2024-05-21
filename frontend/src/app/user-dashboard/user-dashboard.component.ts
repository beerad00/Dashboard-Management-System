import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { CompanyService } from '../services/company.service';
import { AnnouncementDto } from '../models/announcementDto';
import { CompanyDto } from '../models/company.dto';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent implements OnInit {
  announcements: AnnouncementDto[] = [];
  errorMessage: string = '';

  constructor(
    private authService: AuthService,
    private companyService: CompanyService
  ) {}

  ngOnInit(): void {
    // Initialization logic if needed
  }

    async getAnnouncements(): Promise<void> {
      const currentUser = this.authService.getCurrentUser();
      if (currentUser) {
        try {
          const companies = await this.authService.getCompaniesByUserId(currentUser.id);
          if (companies.length > 0) {
            await this.handleCompaniesResponse(companies);
          } else {
            this.errorMessage = 'No company found for the current user.';
          }
        } catch (error) {
          this.handleError('Failed to fetch companies', error);
        }
      } else {
        this.errorMessage = 'User is not logged in.';
      }
    }
  
    private async handleCompaniesResponse(companies: CompanyDto[]): Promise<void> {
      const companyId = companies[0]?.id;
      if (companyId) {
        try {
          const announcements = await this.companyService.getAnnouncementsByCompanyId(companyId);
          this.handleAnnouncementsResponse(announcements);
        } catch (error) {
          this.handleError('Failed to fetch announcements', error);
        }
      } else {
        this.errorMessage = 'No company found for the current user.';
      }
    }
  
    private handleAnnouncementsResponse(announcements: AnnouncementDto[]): void {
      this.announcements = announcements;
    }
  
    private handleError(message: string, error: any): void {
      console.error(message, error);
      this.errorMessage = message + '. Please try again later.';
    }
  }