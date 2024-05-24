package com.cooksys.groupfinal.services.impl;

import com.cooksys.groupfinal.dtos.ProfileDto;
import com.cooksys.groupfinal.dtos.ProjectDto;
import com.cooksys.groupfinal.entities.Project;
import com.cooksys.groupfinal.entities.Team;
import com.cooksys.groupfinal.exceptions.BadRequestException;
import com.cooksys.groupfinal.mappers.ProjectMapper;
import com.cooksys.groupfinal.mappers.TeamMapper;
import com.cooksys.groupfinal.repositories.ProjectRepository;
import com.cooksys.groupfinal.repositories.TeamRepository;
import org.springframework.stereotype.Service;

import com.cooksys.groupfinal.services.ProjectService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ProjectServiceImpl implements ProjectService {

    private final ProjectMapper projectMapper;
    private final ProjectRepository projectRepository;
    private final TeamRepository teamRepository;
    public ProjectDto createProject(ProjectDto projectDto, long teamId)
    {
        try{
            teamRepository.findById(teamId).get();
        }
        catch (Exception e)
        {
            throw new BadRequestException("Team not found");
        }
        Team team = teamRepository.findById(teamId).get();
        Project project = projectMapper.dtoToEntity(projectDto);
        project.setActive(true);
        project.setTeam(team);
        return projectMapper.entityToDto(projectRepository.saveAndFlush(project));

    }

    public ProjectDto updateProject(ProjectDto projectDto, long projectId)
    {
        try{
            projectRepository.findById(projectId).get();
        }
        catch (Exception e)
        {
            throw new BadRequestException("Project not found");
        }
        Project project = projectMapper.dtoToEntity(projectDto);
        project.setId(projectId);

       return projectMapper.entityToDto(projectRepository.saveAndFlush(project));
    }

}
