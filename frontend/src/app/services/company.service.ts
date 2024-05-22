// src/app/services/company.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FullUserDto } from '../models/full-user.dto';
import { CompanyDto } from '../models/company.dto';
import { AnnouncementDto } from '../models/announcementDto';
import { TeamDto } from '../models/team.dto';
import { ProjectDto } from '../models/projectDto';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {
  private apiUrl = 'http://localhost:8080/company'; 

  constructor(private http: HttpClient) {}

  async getUsersByCompanyId(companyId: number): Promise<FullUserDto[]> {
    try {
      const response = await this.http.get<FullUserDto[]>(`${this.apiUrl}/${companyId}/users`).toPromise();
      if (!response) {
        throw new Error('No users found');
      }
<<<<<<< HEAD
      console.log(response, 'response')
=======
>>>>>>> origin/jreed-frontend
      return response;
    } catch (error) {
      this.handleError(error);
      return [];
    }
  }

  async getAnnouncementsByCompanyId(companyId: number): Promise<AnnouncementDto[]> {
    try {
      const response = await this.http.get<AnnouncementDto[]>(`${this.apiUrl}/${companyId}/announcements`).toPromise();
      if (!response) {
        throw new Error('No announcements found');
      }
      return response;
    } catch (error) {
      this.handleError(error);
      return [];
    }
  }

  async getTeamsByCompanyId(companyId: number): Promise<TeamDto[]> {
    try {
      const response = await this.http.get<TeamDto[]>(`${this.apiUrl}/${companyId}/teams`).toPromise();
      if (!response) {
        throw new Error('No teams found');
      }
      return response;
    } catch (error) {
      this.handleError(error);
      return [];
    }
  }

  async getProjectsByTeamId(companyId: number, teamId: number): Promise<ProjectDto[]> {
    try {
      const response = await this.http.get<ProjectDto[]>(`${this.apiUrl}/${companyId}/teams/${teamId}/projects`).toPromise();
      if (!response) {
        throw new Error('No projects found');
      }
      return response;
    } catch (error) {
      this.handleError(error);
      return [];
    }
  }

  async updateProject(project: ProjectDto): Promise<ProjectDto> {
    try {
      const response = await this.http.put<ProjectDto>(`${this.apiUrl}/projects/${project.id}`, project).toPromise();
      if (!response) {
        throw new Error('Failed to update project');
      }
      return response;
    } catch (error) {
      this.handleError(error);
      throw error;
    }
  }

  async createProject(project: ProjectDto, teamId: number): Promise<ProjectDto> {
    try {
      const response = await this.http.post<ProjectDto>(`${this.apiUrl}/${teamId}`, project).toPromise();
      if (!response) {
        throw new Error('Failed to create project');
      }
      return response;
    } catch (error) {
      this.handleError(error);
      throw error;
    }
  }

  private handleError(error: any): void {
    console.error('An error occurred', error);
    // You can handle specific error scenarios here if needed
  }
}
