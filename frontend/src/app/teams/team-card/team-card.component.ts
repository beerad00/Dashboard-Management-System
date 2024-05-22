import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ProjectDto } from 'src/app/models/projectDto';
import { TeamDto } from 'src/app/models/team.dto';
import { CompanyService } from 'src/app/services/company.service';

@Component({
  selector: 'app-team-card',
  templateUrl: './team-card.component.html',
  styleUrls: ['./team-card.component.css']
})
export class TeamCardComponent {
  @Input() team: any;
  selectedCompanyId: number | null = null;
  errorMessage = '';
  teams: TeamDto[] = [];
  projects: ProjectDto[] = [];
  teamId: number | null = null;


  constructor(private router: Router, private companyService: CompanyService) {}

  getProjects = async (teamId: number): Promise<void> => {
    this.teamId = teamId;
    this.selectedCompanyId = Number(localStorage.getItem('selectedCompanyId'));
    console.log(this.selectedCompanyId, teamId, "I pressed projects!");
    if (this.selectedCompanyId) {
      try {
        console.log(this.selectedCompanyId, this.teamId, "I pressed projects!")
        const projects = await this.companyService.getProjectsByTeamId(this.selectedCompanyId, this.teamId);
        console.log(projects);
        this.handleProjectsResponse(projects);
      } catch (error) {
        this.handleError('Failed to fetch projects', error);
      }
    } 
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
