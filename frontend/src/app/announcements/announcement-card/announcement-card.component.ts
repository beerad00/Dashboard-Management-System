import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AnnouncementService } from 'src/app/services/announcement.service';

@Component({
  selector: 'app-announcement-card',
  templateUrl: './announcement-card.component.html',
  styleUrls: ['./announcement-card.component.css']
})
export class AnnouncementCardComponent {
  @Input() announcement: any;

  constructor(private route: ActivatedRoute, private router: Router) {}
  ngOnInit(): void {
    // Check if announcement is provided through @Input, otherwise attempt to retrieve it from route parameters
    if (!this.announcement) {
      this.route.params.subscribe(params => {
        const announcement = params['announcement'];
        if (announcement) {
          this.announcement = JSON.parse(announcement);
        }
      });
    }
  }

  editAnnouncement() {
    const announcementString = JSON.stringify(this.announcement);
    this.router.navigate(['/edit-announcement', { announcement: announcementString }]);

  }
  // deleteAnnouncement() {
  //   this.announcementService.deleteAnnouncement(this.announcement.id);
  // }
}
