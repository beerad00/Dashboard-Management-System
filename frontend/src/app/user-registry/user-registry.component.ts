import { Component, OnInit } from '@angular/core';
import { FullUserDto } from '../models/full-user.dto';
import { CompanyService } from '../services/company.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-registry',
  templateUrl: './user-registry.component.html',
  styleUrls: ['./user-registry.component.css']
})
export class UserRegistryComponent implements OnInit {
  users: FullUserDto[] = [];
  selectedCompanyId: number | null = null;

  constructor(
    private companyService: CompanyService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.selectedCompanyId = +params['companyId'] || null;
      if (this.selectedCompanyId) {
        this.fetchUsers(this.selectedCompanyId);
      }
    });
  }

  async fetchUsers(companyId: number) {
    try {
      this.users = await this.companyService.getUsersByCompanyId(companyId);
    } catch (error) {
      console.error('Failed to load users', error);
    }
  }

  navigateToAddUser() {
    this.router.navigate(['/add-user']);
  }
}
