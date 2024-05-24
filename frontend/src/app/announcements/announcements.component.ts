import { Component, Input } from '@angular/core';
import { FullUserDto } from '../models/full-user.dto';
import { AnnouncementDto } from '../models/announcementDto';
import { AuthService } from '../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CompanyService } from '../services/company.service';

@Component({
  selector: 'app-announcements',
  templateUrl: './announcements.component.html',
  styleUrls: ['./announcements.component.css']
})
export class AnnouncementsComponent {

  users: FullUserDto[] = [];
  currentUser: any;
  announcements: AnnouncementDto[] = [];
  selectedCompanyId: number | null = null;
  errorMessage: string = '';
  loading: boolean = false;
  creatingAnnouncement: boolean = false;
  isLoading: boolean = true;


  constructor(
    private authService: AuthService,
    private companyService: CompanyService,
    public router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.currentUser = this.authService.getCurrentUser();
    if(!this.currentUser){
      this.router.navigate(['/login']);
    }
    this.selectedCompanyId = this.authService.getCurrentCompanyId();
    this.loading = true;
    setTimeout(() => {
      this.getAnnouncements();
    }, 1000);
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
        this.loading = true;
        this.handleError('Failed to fetch announcements', error);
      }
    } else {
      this.errorMessage = 'No company selected.';
    }
  }



  addAnouncement() {
    this.router.navigate(['/add-announcement']);
  }


  onCancelAnnouncement() {
    this.creatingAnnouncement = false;
  }

  private handleAnnouncementsResponse(announcements: AnnouncementDto[]): void {
    this.announcements = announcements;
    this.isLoading = false;
  }

  private handleError(message: string, error: any): void {
    console.error(message, error);
    this.errorMessage = message + '. Please try again later.';
  }

}
