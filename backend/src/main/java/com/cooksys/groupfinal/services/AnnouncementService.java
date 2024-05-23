package com.cooksys.groupfinal.services;

import com.cooksys.groupfinal.dtos.AnnouncementDto;

public interface AnnouncementService {

    AnnouncementDto createAnnoucement(Long companyId, Long userId, AnnouncementDto announcementRequestDto);

    AnnouncementDto updateAnnoucement(Long announcementId, AnnouncementDto announcementDto);

    AnnouncementDto deleteAnnoucement(Long announcementId);
}
