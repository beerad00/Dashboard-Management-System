package com.cooksys.groupfinal.controllers;

import com.cooksys.groupfinal.dtos.UserRequestDto;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import com.cooksys.groupfinal.dtos.CredentialsDto;
import com.cooksys.groupfinal.dtos.FullUserDto;
import com.cooksys.groupfinal.services.UserService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/users")
@RequiredArgsConstructor
public class UserController {
	
	private final UserService userService;
	
	@PostMapping("/login")
	@CrossOrigin(origins="*")
    public FullUserDto login(@RequestBody CredentialsDto credentialsDto) {
        return userService.login(credentialsDto);
    }

//    @PostMapping
//    @ResponseStatus(HttpStatus.CREATED)
//    public UserRequestDto createUser(@RequestBody UserRequestDto userRequestDto) {
//        return userService.createUser(userRequestDto);
//    }

}
