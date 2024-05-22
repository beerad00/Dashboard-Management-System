import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ProjectDto } from 'src/app/models/projectDto';
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.css']
})
export class AddProjectComponent {

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
