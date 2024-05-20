package com.cooksys.groupfinal.services.impl;

import com.cooksys.groupfinal.dtos.TeamDto;
import com.cooksys.groupfinal.dtos.TeamRequestDto;
import com.cooksys.groupfinal.mappers.TeamMapper;
import com.cooksys.groupfinal.repositories.TeamRepository;
import org.springframework.stereotype.Service;

import com.cooksys.groupfinal.services.TeamService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class TeamServiceImpl implements TeamService {

    private final TeamMapper teamMapper;
    private final TeamRepository teamRepository;

    public TeamDto createTeam(Long companyId, TeamRequestDto teamRequestDto)
    {
        //teamMapper.dtoToEntity(teamRepository.saveAndFlush(teamMapper.dtorequestToEntity(teamRequestDto)));
        return teamMapper.entityToDto(teamRepository.saveAndFlush(teamMapper.dtorequestToEntity(teamRequestDto)));
    }

}
