import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { FullUserDto } from '../models/full-user.dto';
import { CompanyDto } from '../models/company.dto';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {
  private apiUrl = 'http://localhost:8080/company'; 

  constructor(private http: HttpClient) {}

  getCompaniesByUserId(userId: number): Observable<CompanyDto[]> {
    return this.http.get<CompanyDto[]>(`${this.apiUrl}/users/${userId}/companies`)
      .pipe(catchError(this.handleError));
  }

  getUsersByCompanyId(companyId: number): Observable<FullUserDto[]> {
    return this.http.get<FullUserDto[]>(`${this.apiUrl}/${companyId}/users`)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: any) {
    console.error('An error occurred', error);
    return throwError(() => new Error('Something went wrong; please try again later.'));
  }
}
