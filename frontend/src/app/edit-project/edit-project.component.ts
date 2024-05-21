import { Component } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { Input } from '@angular/core';
import { Output } from '@angular/core';
import { ProjectDto } from '../models/projectDto';
import { CompanyService } from '../services/company.service';

@Component({
  selector: 'app-edit-project',
  templateUrl: './edit-project.component.html',
  styleUrls: ['./edit-project.component.css']
})
export class EditProjectComponent {
  @Input() project!: ProjectDto;
  @Output() save = new EventEmitter<ProjectDto>();
  @Output() cancel = new EventEmitter<void>();

  constructor(private companyService: CompanyService) {}

  async onSave() {
    try {
      const updatedProject = await this.companyService.updateProject(this.project);
      this.save.emit(updatedProject);
    } catch (error) {
      console.error('Failed to save project', error);
    }
  }

  onCancel() {
    this.cancel.emit();
  }
}