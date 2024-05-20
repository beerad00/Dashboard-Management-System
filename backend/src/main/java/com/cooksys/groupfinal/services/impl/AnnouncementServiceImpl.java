package com.cooksys.groupfinal.services.impl;

import com.cooksys.groupfinal.dtos.AnnouncementDto;
import com.cooksys.groupfinal.dtos.AnnouncementRequestDto;
import com.cooksys.groupfinal.entities.Announcement;
import com.cooksys.groupfinal.mappers.AnnouncementMapper;
import com.cooksys.groupfinal.repositories.AnnouncementRepository;
import org.springframework.stereotype.Service;

import com.cooksys.groupfinal.services.AnnouncementService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AnnouncementServiceImpl implements AnnouncementService {

    private final AnnouncementMapper announcementMapper;
    private final AnnouncementRepository announcementRepository;

    public AnnouncementDto createAnnoucement(Long companyId, Long userId, AnnouncementRequestDto announcementRequestDto)
    {
        Announcement announcement = announcementMapper.dtoToEntity(announcementRequestDto);

        System.out.println(announcement);

        return announcementMapper.entityToDto(announcementRepository.saveAndFlush(announcement));
    }

}