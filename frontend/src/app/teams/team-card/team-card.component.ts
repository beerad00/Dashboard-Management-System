import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ProjectDto } from 'src/app/models/projectDto';
import { TeamDto } from 'src/app/models/team.dto';
import { AuthService } from 'src/app/services/auth.service';
import { CompanyService } from 'src/app/services/company.service';

@Component({
  selector: 'app-team-card',
  templateUrl: './team-card.component.html',
  styleUrls: ['./team-card.component.css']
})
export class TeamCardComponent {
  @Input() team: any;
  @Input() isAdmin: boolean = false;
  @Output() teamID = new EventEmitter<number>();
  selectedCompanyId: number | null = null;
  errorMessage = '';
  teams: TeamDto[] = [];
  projects: ProjectDto[] = [];
  teamId: number | null = null;



  constructor(private router: Router, private companyService: CompanyService, private authService: AuthService) {}

  getProjects = async (teamId: number): Promise<void> => {
    this.teamId = teamId;
    this.selectedCompanyId = this.authService.getCurrentCompanyId();
    if (this.selectedCompanyId) {
      try {
        const projects = await this.companyService.getProjectsByTeamId(this.selectedCompanyId, this.teamId);
        this.handleProjectsResponse(projects);
      } catch (error) {
        this.handleError('Failed to fetch projects', error);
      }
    } 
  }

  editTeam(): void {
    this.router.navigate(['/edit-team', { team: JSON.stringify(this.team) }]);
  }
  

  getProjectsButton(teamId: number): void {
    // Navigate to the Projects component with the team ID as a parameter
    this.router.navigate(['/projects', teamId]);
}

  private handleError(message: string, error: any): void {
    console.error(message, error);
    this.errorMessage = message + '. Please try again later.';
  }

  private handleProjectsResponse(projects: ProjectDto[]): void {
    this.projects = projects;
    console.log(this.projects);
    this.router.navigate(['/projects']);
  }


  
}
