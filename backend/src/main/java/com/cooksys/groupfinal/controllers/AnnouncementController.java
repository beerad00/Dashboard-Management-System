package com.cooksys.groupfinal.controllers;

import com.cooksys.groupfinal.dtos.AnnouncementDto;
import org.springframework.http.HttpStatus;
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
	@ResponseStatus(HttpStatus.CREATED)
	public AnnouncementDto createAnnouncement(@PathVariable Long companyId, @PathVariable Long userId, @RequestBody AnnouncementDto announcementDto) {
		return announcementService.createAnnoucement(companyId, userId, announcementDto);
	}

	@PutMapping("/{announcementId}")
	@ResponseStatus(HttpStatus.ACCEPTED)
	public AnnouncementDto updateAnnouncement(@PathVariable Long announcementId, @RequestBody AnnouncementDto announcementDto) {
		return announcementService.updateAnnoucement(announcementId, announcementDto);
	}

	@DeleteMapping("/{announcementId}")
	@ResponseStatus(HttpStatus.ACCEPTED)
	public AnnouncementDto deleteAnnouncement(@PathVariable Long announcementId) {
		return announcementService.deleteAnnoucement(announcementId);
	}

}
