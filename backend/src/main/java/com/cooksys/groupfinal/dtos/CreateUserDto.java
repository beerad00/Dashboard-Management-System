package com.cooksys.groupfinal.dtos;

import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Data
public class CreateUserDto {
    private String username;
    private String email;
    private String firstName;
    private String lastName;
    private String phone;
    private String password;
    private boolean admin;
    private Long companyId;
}