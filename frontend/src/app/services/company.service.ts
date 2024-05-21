import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { FullUserDto } from '../models/full-user.dto';
import { CompanyDto } from '../models/company.dto';
import { AnnouncementDto } from '../models/announcementDto';

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

  private handleError(error: any): void {
    console.error('An error occurred', error);
    // You can handle specific error scenarios here if needed
  }
}