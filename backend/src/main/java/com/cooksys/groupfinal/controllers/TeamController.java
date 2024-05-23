package com.cooksys.groupfinal.controllers;

import com.cooksys.groupfinal.dtos.TeamDto;
import org.springframework.web.bind.annotation.*;

import com.cooksys.groupfinal.services.TeamService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/team")
@RequiredArgsConstructor
@CrossOrigin(origins="*")
public class TeamController {
	
	private final TeamService teamService;

	@PostMapping("/{companyId}")
	public TeamDto createTeam(@PathVariable Long companyId, @RequestBody TeamDto teamDto) {
		return teamService.createTeam(companyId, teamDto);
	}

	@PutMapping("/{teamId}")
	public TeamDto updateTeam(@PathVariable Long teamId, @RequestBody TeamDto teamDto) {
		return teamService.updateTeam(teamId, teamDto);
	}

	@DeleteMapping("/{teamId}")
	public TeamDto deleteTeam(@PathVariable Long teamId) {
		return teamService.deleteTeam(teamId);
	}

}
