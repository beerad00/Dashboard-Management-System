package com.cooksys.groupfinal.mappers;

import java.util.LinkedHashSet;
import java.util.Set;

import org.mapstruct.Mapper;

import com.cooksys.groupfinal.dtos.AnnouncementDto;
import com.cooksys.groupfinal.entities.Announcement;

@Mapper(componentModel = "spring", uses = { BasicUserMapper.class , CompanyMapper.class })
public interface AnnouncementMapper {
	
	AnnouncementDto entityToDto(Announcement announcement);

    Announcement dtoToEntity(AnnouncementDto announcementDto);

  Set<AnnouncementDto> entitiesToDtos(Set<Announcement> announcement);

  LinkedHashSet<AnnouncementDto> entitiesToOrderedDtos(Set<Announcement> announcement);
    
}
