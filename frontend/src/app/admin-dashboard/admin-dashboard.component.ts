import { Component, OnInit } from '@angular/core';
import { FullUserDto } from '../models/full-user.dto';
import { CompanyService } from '../services/company.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { AnnouncementDto } from '../models/announcementDto';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {
  users: FullUserDto[] = [];
  announcements: AnnouncementDto[] = [];
  selectedCompanyId: number | null = null;
  errorMessage: string = '';

  constructor(
    private authService: AuthService,
    private companyService: CompanyService,
    public router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.selectedCompanyId = +params['companyId'] || null;
      if (this.selectedCompanyId) {
        this.fetchUsers(this.selectedCompanyId);
      } else {
        this.router.navigate(['/select-company']);
      }
    });
  }

  async fetchUsers(companyId: number) {
    try {
      this.users = await this.companyService.getUsersByCompanyId(companyId);
    } catch (error) {
      console.error('Failed to load users', error);
    }
  }

  async getAnnouncements(): Promise<void> {
    if (this.selectedCompanyId) {
      try {
        const announcements = await this.companyService.getAnnouncementsByCompanyId(this.selectedCompanyId);
        this.handleAnnouncementsResponse(announcements);
      } catch (error) {
        this.handleError('Failed to fetch announcements', error);
      }
    } else {
      this.errorMessage = 'No company selected.';
    }
  }

  private handleAnnouncementsResponse(announcements: AnnouncementDto[]): void {
    this.announcements = announcements;
  }

  private handleError(message: string, error: any): void {
    console.error(message, error);
    this.errorMessage = message + '. Please try again later.';
  }

  onAddUser() {
    this.router.navigate(['/add-user']);
  }
}
