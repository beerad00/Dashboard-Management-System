package com.cooksys.groupfinal.services;

import com.cooksys.groupfinal.dtos.*;

import java.util.Set;

public interface UserService {

	FullUserDto login(CredentialsDto credentialsDto);

	Set<CompanyDto> getCompaniesByUserId(Long id);

	FullUserDto createUser(CreateUserDto createUserDto);



}
