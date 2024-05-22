<<<<<<< HEAD
import { Component, OnInit } from '@angular/core';
import { FullUserDto } from '../models/full-user.dto';
import { CompanyService } from '../services/company.service';
=======
// src/app/admin-dashboard/admin-dashboard.component.ts
import { Component, OnInit } from '@angular/core';
import { FullUserDto } from '../models/full-user.dto';
import { CompanyService } from '../services/company.service';
import { ProjectService } from '../services/project.service';
>>>>>>> origin/jreed-frontend
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { AnnouncementDto } from '../models/announcementDto';
import { TeamDto } from '../models/team.dto';
import { ProjectDto } from '../models/projectDto';
<<<<<<< HEAD
import { ProjectService } from '../services/project.service';

=======
>>>>>>> origin/jreed-frontend

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {
  users: FullUserDto[] = [];
  announcements: AnnouncementDto[] = [];
  teams: TeamDto[] = [];
  projects: ProjectDto[] = [];
  selectedProject: ProjectDto | null = null;
  selectedCompanyId: number | null = null;
  selectedTeamId: number | null = null;
  errorMessage: string = '';

  constructor(
    private authService: AuthService,
    private companyService: CompanyService,
    private projectService: ProjectService,
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

  async getProjects(teamId: number): Promise<void> {
    if (this.selectedCompanyId) {
      try {
        const projects = await this.companyService.getProjectsByTeamId(this.selectedCompanyId, teamId);
        this.handleProjectsResponse(projects);
      } catch (error) {
        this.handleError('Failed to fetch projects', error);
      }
    } else {
      this.errorMessage = 'No company selected.';
    }
  }

  onEditProject(project: ProjectDto) {
    this.selectedProject = project;
  }

  async onSaveProject(updatedProject: ProjectDto) {
    try {
      if (updatedProject.id === 0) {
        const newProject = await this.projectService.createProject(updatedProject, this.selectedTeamId!);
        this.projects.push(newProject);
      } else {
        const updated = await this.projectService.updateProject(updatedProject);
        const index = this.projects.findIndex(p => p.id === updated.id);
        if (index !== -1) {
          this.projects[index] = updated;
        }
      }
      this.selectedProject = null;
    } catch (error) {
      this.handleError('Failed to save project', error);
    }
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
      team: this.selectedTeamId ? { id: this.selectedTeamId } : null
    } as ProjectDto;
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

  onAddUser() {
    this.router.navigate(['/add-user']);
  }
<<<<<<< HEAD
=======

  addTeam(){
    this.router.navigate(['/add-team']);
  }
>>>>>>> origin/jreed-frontend
}
