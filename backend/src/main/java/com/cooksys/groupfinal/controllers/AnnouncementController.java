package com.cooksys.groupfinal.controllers;

import com.cooksys.groupfinal.dtos.AnnouncementDto;
import com.cooksys.groupfinal.dtos.AnnouncementRequestDto;
import com.cooksys.groupfinal.dtos.ProjectDto;
import org.springframework.web.bind.annotation.*;

import com.cooksys.groupfinal.services.AnnouncementService;

import lombok.RequiredArgsConstructor;

import java.util.Set;

@RestController
@RequestMapping("/announcements")
@RequiredArgsConstructor
public class AnnouncementController {
	
	private final AnnouncementService announcementService;


	@PostMapping("/{companyId}/{userId}")
	public AnnouncementDto createAnnouncement(@PathVariable Long companyId, @PathVariable Long userId, @RequestBody AnnouncementRequestDto announcementRequestDto) {
		return announcementService.createAnnoucement(companyId, userId, announcementRequestDto);
	}

}
