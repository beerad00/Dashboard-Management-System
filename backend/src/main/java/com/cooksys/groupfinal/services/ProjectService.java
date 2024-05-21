package com.cooksys.groupfinal.services;

import com.cooksys.groupfinal.dtos.ProfileDto;
import com.cooksys.groupfinal.dtos.ProjectDto;

public interface ProjectService {

    ProjectDto createProject(ProjectDto projectDto, long teamId);

    ProjectDto updateProject(ProjectDto projectDto, long projectId);
}
