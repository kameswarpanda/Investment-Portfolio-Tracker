package com.task.portfoliotracker.controller;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.task.portfoliotracker.DTO.LoginRequest;
import com.task.portfoliotracker.DTO.LoginResponse;
import com.task.portfoliotracker.entity.User;
import com.task.portfoliotracker.services.UserService;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "http://localhost:4200", allowedHeaders = "*", allowCredentials = "true")
public class UserController {
    @Autowired
    private UserService userService;

    @PostMapping("/register")
    public User register(@RequestBody User user) {
        return userService.registerUser(user);
    }

    @PostMapping("/login")
    public LoginResponse login(@RequestBody LoginRequest loginRequest) {
        Optional<User> user = userService.login(loginRequest.getEmail(), loginRequest.getPassword());
        if (user.isPresent()) {
            User loggedInUser = user.get();
            return new LoginResponse(
                true,
                "Login successful",
                loggedInUser.getId(),
                loggedInUser.getFullName(),
                loggedInUser.getEmail()
            );
        } else {
            return new LoginResponse(
                false,
                "Invalid credentials",
                null,
                null,
                null
            );
        }
    }
}
