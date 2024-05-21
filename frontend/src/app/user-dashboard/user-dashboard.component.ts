// src/app/user-dashboard/user-dashboard.component.ts
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { CompanyService } from '../services/company.service';
import { AnnouncementDto } from '../models/announcementDto';
import { CompanyDto } from '../models/company.dto';
import { TeamDto } from '../models/team.dto';
import { ProjectDto } from '../models/projectDto';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent implements OnInit {
  announcements: AnnouncementDto[] = [];
  teams: TeamDto[] = [];
  projects: ProjectDto[] = [];
  selectedProject: ProjectDto | null = null;
  errorMessage: string = '';

  constructor(
    public authService: AuthService,
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

  async getTeams(): Promise<void> {
    const currentUser = this.authService.getCurrentUser();
    if (currentUser) {
      try {
        const companies = await this.authService.getCompaniesByUserId(currentUser.id);
        if (companies.length > 0) {
          const companyId = companies[0]?.id;
          if (companyId) {
            const teams = await this.companyService.getTeamsByCompanyId(companyId);
            this.handleTeamsResponse(teams);
          } else {
            this.errorMessage = 'No company found for the current user.';
          }
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

  async getProjects(teamId: number): Promise<void> {
    const currentUser = this.authService.getCurrentUser();
    if (currentUser) {
      try {
        const companies = await this.authService.getCompaniesByUserId(currentUser.id);
        if (companies.length > 0) {
          const companyId = companies[0]?.id;
          if (companyId) {
            const projects = await this.companyService.getProjectsByTeamId(companyId, teamId);
            this.handleProjectsResponse(projects);
          } else {
            this.errorMessage = 'No company found for the current user.';
          }
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

  onEditProject(project: ProjectDto) {
    this.selectedProject = project;
  }

  onSaveProject(updatedProject: ProjectDto) {
    // Update the project in the projects array
    const index = this.projects.findIndex(p => p.id === updatedProject.id);
    if (index !== -1) {
      this.projects[index] = updatedProject;
    }
    this.selectedProject = null;
  }

  onCancelEdit() {
    this.selectedProject = null;
  }

  onCreateProject() {
    this.selectedProject = {
      id: 0,
      name: '',
      description: '',
      active: true,
      team: null
    } as ProjectDto;
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

  private handleTeamsResponse(teams: TeamDto[]): void {
    this.teams = teams;
  }

  private handleProjectsResponse(projects: ProjectDto[]): void {
    this.projects = projects;
  }

  private handleError(message: string, error: any): void {
    console.error(message, error);
    this.errorMessage = message + '. Please try again later.';
  }
}
