import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ProjectDto } from 'src/app/models/projectDto';
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.css']
})
export class AddProjectComponent {

project: ProjectDto = {
    id: 0,
    name: '',
    description: '',
    active: true,
    team: null
  };

  teamId: number | null = null;

  constructor(private projectService: ProjectService, private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const teamIdParam = params.get('teamId');
      this.teamId = teamIdParam ? +teamIdParam : 0; // Default to 0 or some other value
    });
    console.log(this.teamId);
    if(this.teamId){
      this.project.team = {id: this.teamId, name: '', description: '', teammates: []};
  }
}


  async onSave() {
    try {
      const newProject = await this.projectService.createProject(this.project, this.teamId!);
      this.project = newProject;
      this.router.navigate(['/projects', this.teamId]);
    } catch (error) {
      console.error('Failed to save project', error);
    }
  }

  onCancel() {
    this.router.navigate(['/projects', this.teamId]);
  }

}
