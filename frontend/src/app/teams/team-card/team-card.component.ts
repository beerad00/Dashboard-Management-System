import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-team-card',
  templateUrl: './team-card.component.html',
  styleUrls: ['./team-card.component.css']
})
export class TeamCardComponent {
  @Input() team: any;
  @Input() getProjects!: (teamnId: number) => void;

  onGetProjectsClick(teamId: number): void {
    this.getProjects(teamId);
  }
}
