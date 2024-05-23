package com.cooksys.groupfinal.controllers;

import com.cooksys.groupfinal.dtos.AnnouncementDto;
import org.springframework.web.bind.annotation.*;

import com.cooksys.groupfinal.services.AnnouncementService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/announcements")
@RequiredArgsConstructor
@CrossOrigin(origins="*")
public class AnnouncementController {
	
	private final AnnouncementService announcementService;


	@PostMapping("/{companyId}/{userId}")
	public AnnouncementDto createAnnouncement(@PathVariable Long companyId, @PathVariable Long userId, @RequestBody AnnouncementDto announcementDto) {
		return announcementService.createAnnoucement(companyId, userId, announcementDto);
	}

	@PutMapping("/{announcementId}")
	public AnnouncementDto updateAnnouncement(@PathVariable Long announcementId, @RequestBody AnnouncementDto announcementDto) {
		return announcementService.updateAnnoucement(announcementId, announcementDto);
	}

	@DeleteMapping("/{announcementId}")
	public AnnouncementDto deleteAnnouncement(@PathVariable Long announcementId) {
		return announcementService.deleteAnnoucement(announcementId);
	}

}
