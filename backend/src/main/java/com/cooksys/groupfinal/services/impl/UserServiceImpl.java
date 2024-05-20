package com.cooksys.groupfinal.services.impl;

import java.util.Optional;
import java.util.Set;

import com.cooksys.groupfinal.dtos.*;
import com.cooksys.groupfinal.entities.Company;
import com.cooksys.groupfinal.entities.Profile;
import com.cooksys.groupfinal.mappers.CompanyMapper;
import com.cooksys.groupfinal.repositories.CompanyRepository;
import org.springframework.stereotype.Service;

import com.cooksys.groupfinal.entities.Credentials;
import com.cooksys.groupfinal.entities.User;
import com.cooksys.groupfinal.exceptions.BadRequestException;
import com.cooksys.groupfinal.exceptions.NotAuthorizedException;
import com.cooksys.groupfinal.exceptions.NotFoundException;
import com.cooksys.groupfinal.mappers.CredentialsMapper;
import com.cooksys.groupfinal.mappers.FullUserMapper;
import com.cooksys.groupfinal.repositories.UserRepository;
import com.cooksys.groupfinal.services.UserService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {
	
	private final UserRepository userRepository;
    private final FullUserMapper fullUserMapper;
	private final CredentialsMapper credentialsMapper;
    private final CompanyRepository companyRepository;
    private final CompanyMapper companyMapper;

    private User findUser(String username) {
        Optional<User> user = userRepository.findByCredentialsUsernameAndActiveTrue(username);
        if (user.isEmpty()) {
            throw new NotFoundException("The username provided does not belong to an active user.");
        }
        return user.get();
    }
	
	@Override
	public FullUserDto login(CredentialsDto credentialsDto) {
		if (credentialsDto == null || credentialsDto.getUsername() == null || credentialsDto.getPassword() == null) {
            throw new BadRequestException("A username and password are required.");
        }
        Credentials credentialsToValidate = credentialsMapper.dtoToEntity(credentialsDto);
        User userToValidate = findUser(credentialsDto.getUsername());
        if (!userToValidate.getCredentials().equals(credentialsToValidate)) {
            throw new NotAuthorizedException("The provided credentials are invalid.");
        }
        if (userToValidate.getStatus().equals("PENDING")) {
        	userToValidate.setStatus("JOINED");
        	userRepository.saveAndFlush(userToValidate);
        }
        return fullUserMapper.entityToFullUserDto(userToValidate);
	}

    @Override
    public Set<CompanyDto> getCompaniesByUserId(Long id) {
        Set<Company> companiesFound = companyRepository.findByUserId(id);

        return companyMapper.entitiesToDtos(companiesFound);

    }

    @Override
    public FullUserDto createUser(CreateUserDto createUserDto) {
        User newUser = new User();
        newUser.setAdmin(createUserDto.isAdmin());
        newUser.setActive(true);
        Optional<Company> associateCompany = companyRepository.findById(createUserDto.getCompanyId());
        if(associateCompany.isPresent()){
            Company company = associateCompany.get();
            newUser.getCompanies().add(company);
        }

        Profile newProfile = new Profile();
        newProfile.setFirstName(createUserDto.getFirstName());
        newProfile.setLastName(createUserDto.getLastName());
        newProfile.setPhone(createUserDto.getPhone());
        newProfile.setEmail(createUserDto.getEmail());

        Credentials newCredentials = new Credentials();
        newCredentials.setUsername(createUserDto.getUsername());
        newCredentials.setPassword(createUserDto.getPassword());

        newUser.setProfile(newProfile);
        newUser.setCredentials(newCredentials);
        User savedUser = userRepository.saveAndFlush(newUser);


        return fullUserMapper.entityToFullUserDto(savedUser);

    }


}
