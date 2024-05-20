import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FullUserDto } from '../models/full-user.dto';
import { CredentialsDto } from '../models/credentials.dto';
import { UserRequestDto } from '../models/user-request.dto';
import { catchError } from 'rxjs';
import { throwError } from 'rxjs';

@Injectable({
    providedIn: 'root'
  })
export class AuthService {
    private apiUrl = 'http://localhost:8080/users'; // Ensure the URL is correct
  
    constructor(private http: HttpClient) {}
  
    login(credentials: CredentialsDto): Observable<FullUserDto> {
      return this.http.post<FullUserDto>(`${this.apiUrl}/login`, credentials);
    }
  
    register(userRequest: any): Observable<any> {
      return this.http.post(`${this.apiUrl}/new`, userRequest);
    }
  }