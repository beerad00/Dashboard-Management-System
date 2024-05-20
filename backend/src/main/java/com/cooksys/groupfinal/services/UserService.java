package com.cooksys.groupfinal.services;

import com.cooksys.groupfinal.dtos.CompanyDto;
import com.cooksys.groupfinal.dtos.CredentialsDto;
import com.cooksys.groupfinal.dtos.FullUserDto;
import com.cooksys.groupfinal.dtos.UserRequestDto;

import java.util.Set;

public interface UserService {

	FullUserDto login(CredentialsDto credentialsDto);

	Set<CompanyDto> getCompaniesByUserId(Long id);


//	UserRequestDto createUser(UserRequestDto userRequestDto);
}
