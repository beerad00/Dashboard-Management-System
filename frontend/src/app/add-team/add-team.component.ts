import { Component } from '@angular/core';
import { TeamDto } from '../models/team.dto';
import { FullUserDto } from '../models/full-user.dto';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { TeamService } from '../services/team.service';
import { CompanyService } from '../services/company.service';

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
  companyId: number = 7;
  companyEmployees: FullUserDto[] = [];

  constructor(private http: HttpClient,
              private router: Router,
              private teamService: TeamService,
              private companyService: CompanyService) {}

  ngOnInit(): void{
    this.getCompanyEmployees();
  }

  async getCompanyEmployees() {
    this.companyEmployees = await this.companyService.getUsersByCompanyId(this.companyId); 
  }

  onSubmit() {
    console.log(this.teamRequest.teammates);
    this.teamService.createTeam(this.teamRequest, this.companyId);
    this.router.navigate(['/admin-dashboard']);
  }

}
