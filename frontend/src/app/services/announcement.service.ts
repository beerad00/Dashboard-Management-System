import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AnnouncementDto } from '../models/announcementDto';

@Injectable({
  providedIn: 'root'
})
export class AnnouncementService {
  private apiUrl = 'http://localhost:8080/announcements';

  constructor(private http: HttpClient) {}
  
    async createAnnouncement(companyId: number, userId: number, announcement: AnnouncementDto): Promise<AnnouncementDto> {
      try {
        const response = await this.http.post<AnnouncementDto>(`${this.apiUrl}/${companyId}/${userId}`, announcement).toPromise();
        if (!response) {
          throw new Error('Failed to create announcement');
        }
        return response;
      } catch (error) {
        this.handleError(error);
        throw error;
      }
    }

    async editAnnouncement(announcementId: number, announcement: AnnouncementDto): Promise<AnnouncementDto> {
      try {
        const response = await this.http.put<AnnouncementDto>(`${this.apiUrl}/${announcementId}`, announcement).toPromise();
        if (!response) {
          throw new Error('Failed to edit announcement');
        }
        return response;
      } catch (error) {
        this.handleError(error);
        throw error;
      }
    }

    async deleteAnnouncement(announcementId: number): Promise<void> {
      try {
        console.log('announcementId', announcementId);
        await this.http.delete(`${this.apiUrl}/${announcementId}`).toPromise();
      } catch (error) {
        this.handleError(error);
        throw error;
      }
    }
  
    private handleError(error: any): void {
      console.error('An error occurred', error);
    }
  }
  