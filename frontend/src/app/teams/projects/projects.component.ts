import { Component, OnInit } from '@angular/core';
import { FullUserDto } from '../../models/full-user.dto';
import { CompanyService } from '../../services/company.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { AnnouncementDto } from '../../models/announcementDto';
import { TeamDto } from '../../models/team.dto';
import { ProjectDto } from '../../models/projectDto';
import { ProjectService } from '../../services/project.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent {
  users: FullUserDto[] = [];
  announcements: AnnouncementDto[] = [];
  teams: TeamDto[] = [];
  projects: ProjectDto[] = [];
  selectedProject: ProjectDto | null = null;
  selectedCompanyId: number | null = null;
  selectedTeamId: number | null = null;
  errorMessage: string = '';
  currentUser: any;
  teamId: number | null = null;



  constructor(
    private authService: AuthService,
    private companyService: CompanyService,
    private projectService: ProjectService,
    public router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.teamId = +params['teamId'] || null;
      if (this.teamId !== null) {
        this.getProjectsByTeamId(this.teamId);
      } else {
        this.errorMessage = 'No team selected.';
      }
    });


    this.currentUser = this.authService.getCurrentUser();
    console.log(this.currentUser);
    this.selectedCompanyId = Number(localStorage.getItem('selectedCompanyId'));
    console.log(this.selectedCompanyId);
    console.log(this.teamId, "team id");
    this.getProjectsByTeamId(this.teamId!);

  }


  getProjectsByTeamId = async (teamId: number): Promise<void> => {
    this.selectedCompanyId = Number(localStorage.getItem('selectedCompanyId'));
    try {
      const projects = await this.companyService.getProjectsByTeamId(this.selectedCompanyId, teamId);
      this.handleProjectsResponse(projects);
    } catch (error) {
      this.handleError('Failed to fetch projects', error);
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

  private handleError(message: string, error: any): void {
    console.error(message, error);
    this.errorMessage = message + '. Please try again later.';
  }

  private handleProjectsResponse(projects: ProjectDto[]): void {
    this.projects = projects;
  }




}
