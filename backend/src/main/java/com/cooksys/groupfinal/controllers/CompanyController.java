package com.cooksys.groupfinal.controllers;

import java.util.List;
import java.util.Set;

import com.cooksys.groupfinal.dtos.*;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import com.cooksys.groupfinal.services.CompanyService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/company")
@RequiredArgsConstructor
@CrossOrigin(origins="*")
public class CompanyController {
	
	private final CompanyService companyService;
	
	@GetMapping("/{id}/users")
    @ResponseStatus(HttpStatus.ACCEPTED)
    public Set<FullUserDto> getAllUsers(@PathVariable Long id) {
        return companyService.getAllUsers(id);
    }

    @GetMapping
    @ResponseStatus(HttpStatus.ACCEPTED)
    public Set<CompanyDto> getAllCompanies() {
        return companyService.getAllCompanies();
    }

    @GetMapping("/{id}/announcements")
    @ResponseStatus(HttpStatus.ACCEPTED)
    public Set<AnnouncementDto> getAllAnnouncements(@PathVariable Long id) {
        return companyService.getAllAnnouncements(id);
    }
	
	@GetMapping("/{id}/teams")
    @ResponseStatus(HttpStatus.ACCEPTED)
    public Set<TeamDto> getAllTeams(@PathVariable Long id) {
        return companyService.getAllTeams(id);
    }
	
	@GetMapping("/{companyId}/teams/{teamId}/projects")
    @ResponseStatus(HttpStatus.ACCEPTED)
	public Set<ProjectDto> getAllProjects(@PathVariable Long companyId, @PathVariable Long teamId) {
		return companyService.getAllProjects(companyId, teamId);
	}

}
