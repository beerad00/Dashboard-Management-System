import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FullUserDto } from 'src/app/models/full-user.dto';
import { TeamDto } from 'src/app/models/team.dto';
import { AuthService } from 'src/app/services/auth.service';
import { CompanyService } from 'src/app/services/company.service';
import { TeamService } from 'src/app/services/team.service';

@Component({
  selector: 'app-edit-team',
  templateUrl: './edit-team.component.html',
  styleUrls: ['./edit-team.component.css']
})
export class EditTeamComponent {
  teamRequest: TeamDto = {
    id: 0,
    name: '',
    description: '',
    teammates: []
  };
  companyId: number | null = null;
  companyEmployees: FullUserDto[] = [];
  selectedEmployee = null;
  teamId: number | null = null;

  constructor(private http: HttpClient,
              private router: Router,
              private route: ActivatedRoute,
              private teamService: TeamService,
              private authService: AuthService,
              private companyService: CompanyService) {}

  ngOnInit(): void{
    this.route.params.subscribe(params => {
      const teamToEdit = params['team'];
      if (teamToEdit) {
        this.teamRequest = JSON.parse(teamToEdit) as TeamDto;
      }
    });
    console.log(this.teamRequest);
 
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

  onCancel() {
    this.router.navigate(['/teams']);
  }

}
