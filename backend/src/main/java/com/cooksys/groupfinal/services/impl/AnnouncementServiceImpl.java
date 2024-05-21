package com.cooksys.groupfinal.services.impl;

import com.cooksys.groupfinal.dtos.AnnouncementDto;
import com.cooksys.groupfinal.entities.Announcement;
import com.cooksys.groupfinal.mappers.AnnouncementMapper;
import com.cooksys.groupfinal.repositories.AnnouncementRepository;
import com.cooksys.groupfinal.repositories.CompanyRepository;
import com.cooksys.groupfinal.repositories.UserRepository;
import org.springframework.stereotype.Service;

import com.cooksys.groupfinal.services.AnnouncementService;

import lombok.RequiredArgsConstructor;

import java.sql.Timestamp;
import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class AnnouncementServiceImpl implements AnnouncementService {

    private final AnnouncementMapper announcementMapper;
    private final AnnouncementRepository announcementRepository;
    private final CompanyRepository companyRepository;
    private final UserRepository userRepository;

    public AnnouncementDto createAnnoucement(Long companyId, Long userId, AnnouncementDto announcementDto)
    {
        Announcement announcement = announcementMapper.dtoToEntity(announcementDto);
        announcement.setDate(Timestamp.valueOf(LocalDateTime.now()));
        announcement.setCompany(companyRepository.findById(companyId).get());
        announcement.setAuthor(userRepository.findById(userId).get());
        //System.out.println(announcement);

        return announcementMapper.entityToDto(announcementRepository.saveAndFlush(announcement));
    }

}