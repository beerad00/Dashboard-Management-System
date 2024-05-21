
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProjectDto } from '../models/projectDto';


@Injectable({
    providedIn: 'root'
  })
  export class ProjectService {
    private apiUrl = 'http://localhost:8080/projects'; 
  
    constructor(private http: HttpClient) {}
  
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
  
    async updateProject(project: ProjectDto): Promise<ProjectDto> {
      try {
        const response = await this.http.put<ProjectDto>(`${this.apiUrl}/${project.id}`, project).toPromise();
        if (!response) {
          throw new Error('Failed to update project');
        }
        return response;
      } catch (error) {
        this.handleError(error);
        throw error;
      }
    }
  
    private handleError(error: any): void {
      console.error('An error occurred', error);
    }
  }
  