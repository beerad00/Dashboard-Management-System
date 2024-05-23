import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, throwError, tap, BehaviorSubject } from 'rxjs';
import { FullUserDto } from '../models/full-user.dto';
import { CredentialsDto } from '../models/credentials.dto';
import { UserRequestDto } from '../models/user-request.dto';
import { CompanyDto } from '../models/company.dto';
import { createUserDto } from '../models/createUserDto';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/users';
  private currentUser: FullUserDto | null = null;
  private loggedIn = new BehaviorSubject<boolean>(false);
  private adminStatus = new BehaviorSubject<boolean>(false);
  private companyId = new BehaviorSubject<number | null>(null);
  private companySelected = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient, private router: Router) {}

  async login(credentials: CredentialsDto): Promise<FullUserDto> {
    const response = await this.http.post<FullUserDto>(`${this.apiUrl}/login`, credentials).toPromise();
    if (!response) {
      throw new Error('Login failed');
    }
    this.currentUser = response;
    if (response.admin) {
      this.adminStatus.next(true);
    }
    return response;
  }

  async register(userRequest: createUserDto): Promise<any> {
    console.log('userRequest', userRequest);
    return this.http.post(`${this.apiUrl}/create`, userRequest).toPromise();
  }

  getCurrentUser(): FullUserDto | null {
    return this.currentUser;
  }

  setCurrentCompanyId(companyId: number): void {
    this.companyId.next(companyId);
    this.loggedIn.next(true);
    this.companySelected.next(true);
  };


  getCurrentCompanyId(): number | null {
    return this.companyId.getValue();
  }



  async getCompaniesByUserId(userId: number): Promise<CompanyDto[]> {
    try {
      const response = await this.http.get<CompanyDto[]>(`${this.apiUrl}/${userId}/companies`).toPromise();
      if (!response) {
        throw new Error('No companies found');
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

  get isLoggedIn(): Observable<boolean> {
    return this.loggedIn.asObservable();
  }

  get hasCompanyId(): Observable<boolean> {
    return this.companySelected.asObservable();
  }

  get isAdmin(): Observable<boolean> {
    console.log('adminStatus', this.adminStatus.asObservable());
    return this.adminStatus.asObservable();

    
  }

  async updateUser(userId: number, user: UserRequestDto): Promise<FullUserDto> {
    try {
      const response = await this.http.put<FullUserDto>(`${this.apiUrl}/${userId}`, user).toPromise();
      if (!response) {
        throw new Error('Failed to update user');
      }
      return response;
    } catch (error) {
      this.handleError(error);
      throw error;
    }
  }

  async deleteUser(userId: number): Promise<void> {
    try {
      await this.http.delete(`${this.apiUrl}/${userId}`).toPromise();
    } catch (error) {
      this.handleError(error);
    }
  }
  

  async logout(): Promise<void> {
    this.currentUser = null;
    this.loggedIn.next(false);
    this.companySelected.next(false);
    this.adminStatus.next(false);
    this.companyId.next(null);
    this.router.navigate(['/login']);
  }
}