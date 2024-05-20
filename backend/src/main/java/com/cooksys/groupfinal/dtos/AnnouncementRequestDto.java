package com.cooksys.groupfinal.dtos;

import com.cooksys.groupfinal.entities.Company;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Timestamp;

@NoArgsConstructor
@Data
public class AnnouncementRequestDto {

    private String title;

    private String message;

    private BasicUserDto author;

    private CompanyDto company;
}
