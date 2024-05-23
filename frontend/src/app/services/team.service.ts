import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, throwError, tap } from 'rxjs';
import { FullUserDto } from '../models/full-user.dto';
import { CredentialsDto } from '../models/credentials.dto';
import { UserRequestDto } from '../models/user-request.dto';
import { CompanyDto } from '../models/company.dto';
import { createUserDto } from '../models/createUserDto';
import { Router } from '@angular/router';
import { TeamDto } from '../models/team.dto';

@Injectable({
  providedIn: 'root'
})
export class TeamService {
  private apiUrl = 'http://localhost:8080/team';

  constructor(private http: HttpClient,
              private router: Router) {}

  createTeam(teamRequest: TeamDto, companyId: number){
    this.http.post(`http://localhost:8080/team/${companyId}`, teamRequest).subscribe(
        response => {
          console.log('Team saved successfully', response);
        }, error => {
          console.error('Error saving team', error);
        });
  
      this.router.navigate(['/admin-dashboard']);
  }

  getTeam(teamId: number): TeamDto {
    let team: TeamDto = {
      id: 0,
      name: '',
      description: '',
      teammates: []
    };
    this.http.get<TeamDto>(`${this.apiUrl}/${teamId}`).subscribe(
      response => {
        team = response;
      }, error => {
        console.error('Error getting team', error);
      });
    return team;
  }

  editTeam(teamRequest: TeamDto){
    this.http.put(`${this.apiUrl}/${teamRequest.id}`, teamRequest).subscribe(
      response => {
        console.log('Team updated successfully', response);
      }, error => {
        console.error('Error updating team', error);
      });
  
    this.router.navigate(['/admin-dashboard']);
  }

  deleteTeam(teamId: number){
    this.http.delete(`${this.apiUrl}/${teamId}`).subscribe(
      response => {
        console.log('Team deleted successfully', response);
      }, error => {
        console.error('Error deleting team', error);
      });
  }

}