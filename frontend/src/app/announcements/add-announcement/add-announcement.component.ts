import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AnnouncementDto } from 'src/app/models/announcementDto';
import { FullUserDto } from 'src/app/models/full-user.dto';
import { ProjectDto } from 'src/app/models/projectDto';
import { TeamDto } from 'src/app/models/team.dto';
import { AnnouncementService } from 'src/app/services/announcement.service';
import { AuthService } from 'src/app/services/auth.service';
import { CompanyService } from 'src/app/services/company.service';
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-add-announcement',
  templateUrl: './add-announcement.component.html',
  styleUrls: ['./add-announcement.component.css']
})
export class AddAnnouncementComponent {
  announcement: AnnouncementDto = {
    id: 0,
    title: '',
    message: '',
    date: new Date(),
    author: {
      id: 0,
      profile: {
        firstName: '',
        lastName: '',
        email: '',
        phone: ''
      },
      admin: false,
      active: true,
      status: ''
    }
  };

  users: FullUserDto[] = [];
  announcements: AnnouncementDto[] = [];
  selectedCompanyId: number | null = null;
  selectedTeamId: number | null = null;
  creatingAnnouncement: boolean = false; // Track announcement creation state
  errorMessage: string = '';
  currentUser: any;


  constructor(private authService: AuthService,
    private companyService: CompanyService,
    private projectService: ProjectService,
    public router: Router,
    private announcementService: AnnouncementService) {
    
  }

  ngOnInit(): void {
    this.selectedCompanyId = this.authService.getCurrentCompanyId();
    this.currentUser = this.authService.getCurrentUser();
    console.log('CreateAnnouncementComponent initialized');
  }



  onCreateAnnouncement() {
    console.log('Create Announcement button clicked');
    this.creatingAnnouncement = true;
  }

  async onSaveAnnouncement(newAnnouncement: AnnouncementDto) {
    try {
      await this.createAnnouncement(newAnnouncement);
      this.creatingAnnouncement = false;
    } catch (error) {
      console.error('Failed to save announcement', error);
    }
  }

  onCancelAnnouncement() {
    this.creatingAnnouncement = false;
  }



  async onSave() {
    try {
      const createdAnnouncement = await this.announcementService.createAnnouncement(this.selectedCompanyId!, this.currentUser.id, this.announcement);
      this.createAnnouncement(createdAnnouncement);
      this.router.navigate(['/announcements']);
    } catch (error) {
      console.error('Failed to create announcement', error);
    }
  }


  async createAnnouncement(announcement: AnnouncementDto): Promise<void> {
    if(this.selectedCompanyId) {
        try {
          await this.announcementService.createAnnouncement(this.selectedCompanyId, this.currentUser.id, announcement);
        } catch (error) {
          this.handleError('Failed to create announcement', error);
        }
      } else {
        this.errorMessage = 'User is not logged in.';
      }
    } 
  
  



  private handleError(message: string, error: any): void {
    console.error(message, error);
    this.errorMessage = message + '. Please try again later.';
  }


  onCancel() {
    this.router.navigate(['/announcements']);
  }




}
