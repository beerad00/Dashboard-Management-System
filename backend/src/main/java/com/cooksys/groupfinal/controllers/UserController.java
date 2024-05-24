package com.cooksys.groupfinal.controllers;

import com.cooksys.groupfinal.dtos.*;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import com.cooksys.groupfinal.services.UserService;

import lombok.RequiredArgsConstructor;

import java.util.Set;

@RestController
@RequestMapping("/users")
@RequiredArgsConstructor
@CrossOrigin(origins="*")
public class UserController {
	
	private final UserService userService;
    @ResponseStatus(HttpStatus.CREATED)
	@PostMapping("/login")
    public FullUserDto login(@RequestBody CredentialsDto credentialsDto) {
        return userService.login(credentialsDto);
    }
    @ResponseStatus(HttpStatus.ACCEPTED)
    @GetMapping("/{id}/companies")
    public Set<CompanyDto> getCompaniesByUserId(@PathVariable Long id){
        return userService.getCompaniesByUserId(id);
    }

    @PostMapping("/create")
    @ResponseStatus(HttpStatus.CREATED)
    public FullUserDto createUser(@RequestBody CreateUserDto createUserDto) {
        return userService.createUser(createUserDto);
    }


    @PutMapping("/{userId}")
    @ResponseStatus(HttpStatus.ACCEPTED)
    public FullUserDto updateUser(@PathVariable("userId") Long userId,@RequestBody FullUserDto UserDto) {
        return userService.updateUser(userId,UserDto);
    }
    @ResponseStatus(HttpStatus.ACCEPTED)
    @DeleteMapping("/{userId}")
    public FullUserDto deleteUser(@PathVariable("userId") Long userId) {
        return userService.deleteUser(userId);
    }


}
