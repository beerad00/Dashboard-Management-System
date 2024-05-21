import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FullUserDto } from '../models/full-user.dto';
import { CredentialsDto } from '../models/credentials.dto';
import { UserRequestDto } from '../models/user-request.dto';
import { catchError } from 'rxjs';
import { throwError } from 'rxjs';
import { tap } from 'rxjs';

@Injectable({
    providedIn: 'root'
  })
  export class AuthService {
    private apiUrl = 'http://localhost:8080/users';
    private currentUser: FullUserDto | null = null;
  
    constructor(private http: HttpClient) {}
  
    login(credentials: CredentialsDto): Observable<FullUserDto> {
      return this.http.post<FullUserDto>(`${this.apiUrl}/login`, credentials)
        .pipe(
          tap((user: FullUserDto) => this.currentUser = user),
          catchError(this.handleError)
        );
    }
  
    register(userRequest: UserRequestDto): Observable<any> {
      return this.http.post(`${this.apiUrl}/new`, userRequest)
        .pipe(catchError(this.handleError));
    }
  
    getCurrentUser(): FullUserDto | null {
      return this.currentUser;
    }
  
    private handleError(error: any) {
      console.error('An error occurred', error);
      return throwError(() => new Error('Something went wrong; please try again later.'));
    }

    getUserCompanies() {
      const userId = localStorage.getItem('currentUser')
      console.log(userId);
  
      console.log(`${this.apiUrl}/${userId}/companies`);
      console.log(JSON.stringify(this.http.get(`${this.apiUrl}/${userId}/companies`)))
      return this.http.get(`${this.apiUrl}/${userId}/companies`);
    }
  }