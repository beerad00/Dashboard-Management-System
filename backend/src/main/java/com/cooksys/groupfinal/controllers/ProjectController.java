package com.cooksys.groupfinal.controllers;

import com.cooksys.groupfinal.dtos.ProfileDto;
import com.cooksys.groupfinal.dtos.ProjectDto;
import org.springframework.web.bind.annotation.*;

import com.cooksys.groupfinal.services.ProjectService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/projects")
@RequiredArgsConstructor
@CrossOrigin(origins="*")
public class ProjectController {
	
	private final ProjectService projectService;
	@PostMapping("/{teamId}")
	ProjectDto createProject(@RequestBody ProjectDto projectDto, @PathVariable("teamId") long teamId)
	{
		return projectService.createProject(projectDto, teamId);
	}
	@PutMapping("/{projectId}")
	ProjectDto updateProject(@RequestBody ProjectDto projectDto, @PathVariable("projectId") long projectId)
	{
		return projectService.updateProject(projectDto, projectId);
	}

}
