package com.cooksys.groupfinal.services.impl;

import com.cooksys.groupfinal.dtos.TeamDto;
import com.cooksys.groupfinal.entities.Team;
import com.cooksys.groupfinal.exceptions.BadRequestException;
import com.cooksys.groupfinal.mappers.TeamMapper;
import com.cooksys.groupfinal.repositories.CompanyRepository;
import com.cooksys.groupfinal.repositories.TeamRepository;
import org.springframework.stereotype.Service;

import com.cooksys.groupfinal.services.TeamService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class TeamServiceImpl implements TeamService {

    private final TeamMapper teamMapper;
    private final TeamRepository teamRepository;
    private final CompanyRepository companyRepository;
    public TeamDto createTeam(Long companyId, TeamDto teamDto)
    {
        try{
            companyRepository.findById(companyId).get();
        }
        catch (Exception e)
        {
            throw new BadRequestException("Team not found");
        }

        Team team = teamMapper.dtoToEntity(teamDto);
        team.setCompany(companyRepository.findById(companyId).get());
        return teamMapper.entityToDto(teamRepository.saveAndFlush(team));
    }

    public TeamDto updateTeam(Long teamId, TeamDto teamDto)
    {
        try{
            teamRepository.findById(teamId).get();
        }
        catch (Exception e)
        {
            throw new BadRequestException("Team not found");
        }
        Team newteam = teamMapper.dtoToEntity(teamDto);
        newteam.setId(teamId);
        newteam.setCompany(teamRepository.findById(teamId).get().getCompany());
        return teamMapper.entityToDto(teamRepository.saveAndFlush(newteam));
    }


    public TeamDto deleteTeam(Long teamId)
    {
        try{
            teamRepository.findById(teamId).get();
        }
        catch (Exception e)
        {
            throw new BadRequestException("Team not found");
        }
        Team deletedteam = teamRepository.findById(teamId).get();
        Team returnteam = new Team();
        returnteam.setId(deletedteam.getId());
        returnteam.setDescription(deletedteam.getDescription());
        returnteam.setName(deletedteam.getName());
        returnteam.setProjects(deletedteam.getProjects());
        returnteam.setCompany(deletedteam.getCompany());
        teamRepository.delete(deletedteam);
        return teamMapper.entityToDto(returnteam);
    }
}
