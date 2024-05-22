import { Component } from '@angular/core';
import { TeamDto } from '../../models/team.dto';
import { FullUserDto } from '../../models/full-user.dto';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { TeamService } from '../../services/team.service';
import { CompanyService } from '../../services/company.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-add-team',
  templateUrl: './add-team.component.html',
  styleUrls: ['./add-team.component.css']
})
export class AddTeamComponent {
  teamRequest: TeamDto = {
    id: 0,
    name: '',
    description: '',
    teammates: []
  };
  companyId: number | null = null;
  companyEmployees: FullUserDto[] = [];
  selectedEmployee = null;

  constructor(private http: HttpClient,
              private router: Router,
              private teamService: TeamService,
              private authService: AuthService,
              private companyService: CompanyService) {}

  ngOnInit(): void{
    this.companyId = this.authService.getCurrentCompanyId();
    this.getCompanyEmployees();
  }

  addTeammate() {
    if (this.selectedEmployee && !this.teamRequest.teammates.includes(this.selectedEmployee)) {
      this.teamRequest.teammates.push(this.selectedEmployee);
      this.selectedEmployee = null;
    }
  }

  removeTeammate(index: number) {
    this.teamRequest.teammates.splice(index, 1);
  }

  async getCompanyEmployees() {
    if(this.companyId){
      try {
        this.companyEmployees = await this.companyService.getUsersByCompanyId(this.companyId);
      } catch (error) {
        console.error('Failed to load users', error);
    }
  }
}

  onSubmit() {
    if(this.companyId){
      try {
    console.log(this.teamRequest.teammates);
    this.teamService.createTeam(this.teamRequest, this.companyId);
    this.router.navigate(['/teams']);
      } catch (error) {
        console.error('Failed to load users', error);
      }
    }
  }
  
}



