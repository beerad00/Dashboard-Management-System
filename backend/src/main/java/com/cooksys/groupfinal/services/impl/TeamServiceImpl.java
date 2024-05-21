package com.cooksys.groupfinal.services.impl;

import com.cooksys.groupfinal.dtos.TeamDto;
import com.cooksys.groupfinal.entities.Team;
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
        Team team = teamMapper.dtoToEntity(teamDto);
        team.setCompany(companyRepository.findById(companyId).get());
        //teamMapper.dtoToEntity(teamRepository.saveAndFlush(teamMapper.dtoToEntity(teamRequestDto)));
        return teamMapper.entityToDto(teamRepository.saveAndFlush(team));
    }

}
