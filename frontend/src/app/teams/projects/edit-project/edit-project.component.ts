import { Component } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { Input } from '@angular/core';
import { Output } from '@angular/core';
import { ProjectDto } from '../../../models/projectDto';
import { CompanyService } from '../../../services/company.service';
import { ProjectService } from '../../../services/project.service';


@Component({
  selector: 'app-edit-project',
  templateUrl: './edit-project.component.html',
  styleUrls: ['./edit-project.component.css']
})
export class EditProjectComponent {
  @Input() project: ProjectDto = {
    id: 0,
    name: '',
    description: '',
    active: true,
    team: null
  };
  @Output() save = new EventEmitter<ProjectDto>();
  @Output() cancel = new EventEmitter<void>();

  constructor(private projectService: ProjectService) {}

  async onSave() {
    try {
      let updatedProject: ProjectDto;
      if (this.project.id === 0) {
        // Assuming the parent component handles the creation with the correct teamId
        updatedProject = this.project;
      } else {
        updatedProject = await this.projectService.updateProject(this.project);
      }
      this.save.emit(updatedProject);
    } catch (error) {
      console.error('Failed to save project', error);
    }
  }

  onCancel() {
    this.cancel.emit();
  }
}