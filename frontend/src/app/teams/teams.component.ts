import { Component, OnInit } from '@angular/core';
import { FullUserDto } from '../models/full-user.dto';
import { CompanyService } from '../services/company.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { AnnouncementDto } from '../models/announcementDto';
import { TeamDto } from '../models/team.dto';
import { ProjectDto } from '../models/projectDto';
import { ProjectService } from '../services/project.service';

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.css']
})
export class TeamsComponent {

  constructor(
    private authService: AuthService,
    private companyService: CompanyService,
    private projectService: ProjectService,
    public router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.currentUser = this.authService.getCurrentUser();
    this.selectedCompanyId = this.authService.getCurrentCompanyId();

    if(!this.currentUser){
      this.router.navigate(['/login']);
    }
    
    this.getTeams();
  }

  users: FullUserDto[] = [];
  currentUser: any;
  announcements: AnnouncementDto[] = [];
  teams: TeamDto[] = [];
  projects: ProjectDto[] = [];
  selectedProject: ProjectDto | null = null;
  selectedCompanyId: number | null = null;
  selectedTeamId: number | null = null;
  errorMessage: string = '';



  async getTeams(): Promise<void> {
    if (this.selectedCompanyId) {
      try {
        const teams = await this.companyService.getTeamsByCompanyId(this.selectedCompanyId);
        this.handleTeamsResponse(teams);
      } catch (error) {
        this.handleError('Failed to fetch teams', error);
      }
    } else {
      this.errorMessage = 'No company selected.';
    }
  }


  getProjects = async (teamId: number): Promise<void> => {
    this.selectedCompanyId = Number(localStorage.getItem('selectedCompanyId'));
    console.log(this.selectedCompanyId, teamId, "I pressed projects!");
    if (this.selectedCompanyId) {
      try {
        console.log(this.selectedCompanyId, teamId, "I pressed projects!")
        const projects = await this.companyService.getProjectsByTeamId(this.selectedCompanyId, teamId);
        console.log(projects);
        this.handleProjectsResponse(projects);
      } catch (error) {
        this.handleError('Failed to fetch projects', error);
      }
    } 
  }

  private handleError(message: string, error: any): void {
    console.error(message, error);
    this.errorMessage = message + '. Please try again later.';
  }

  private handleTeamsResponse(teams: TeamDto[]): void {
    this.teams = teams;
    console.log("Teams available!", this.teams);
  }

  private handleProjectsResponse(projects: ProjectDto[]): void {
    this.projects = projects;
    console.log(this.projects);
    this.router.navigate(['/projects']);
  }

  addTeam(){
    this.router.navigate(['/add-team']);
  }


}
