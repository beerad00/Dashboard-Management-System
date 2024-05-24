import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AnnouncementDto } from 'src/app/models/announcementDto';
import { FullUserDto } from 'src/app/models/full-user.dto';
import { AnnouncementService } from 'src/app/services/announcement.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-add-announcement',
  templateUrl: './add-announcement.component.html',
  styleUrls: ['./add-announcement.component.css']
})
export class AddAnnouncementComponent implements OnInit {
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

  currentUser: FullUserDto | null = null;
  selectedCompanyId: number | null = null;
  creatingAnnouncement: boolean = false;
  errorMessage: string = '';

  constructor(
    private authService: AuthService,
    private announcementService: AnnouncementService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.selectedCompanyId = this.authService.getCurrentCompanyId();
    this.currentUser = this.authService.getCurrentUser();
  }

  onSave(): void {
    if (!this.announcement.title || !this.announcement.message) {
      this.errorMessage = 'Please fill in all fields.';
      return;
    }

    this.errorMessage = '';

    try {
      this.announcementService.createAnnouncement(this.selectedCompanyId!, this.currentUser!.id, this.announcement)
        .then(createdAnnouncement => {
          console.log('Announcement created:', createdAnnouncement);
          this.router.navigate(['/announcements']);
        })
        .catch(error => {
          this.handleError('Failed to save announcement', error);
        });
    } catch (error) {
      this.handleError('Failed to create announcement', error);
    }
  }

  private handleError(message: string, error: any): void {
    console.error(message, error);
    this.errorMessage = message + '. Please try again later.';
  }

  onCancel(): void {
    this.router.navigate(['/announcements']);
  }
}
