package com.task.portfoliotracker.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.task.portfoliotracker.entity.User;
import com.task.portfoliotracker.services.UserService;

@RestController
@RequestMapping("/api/users")
public class UserController {
    @Autowired
    private UserService userService;

    @PostMapping("/register")
    public User register(@RequestBody User user) {
        return userService.registerUser(user);
    }

    @PostMapping("/login")
    public Boolean login(@RequestParam String email, @RequestParam String password) {
//        return userService.login(email, password).isPresent() ? "Login successful" : "Invalid credentials";
    		if(userService.login(email, password).isPresent()) {
    			return true;
    		}else {
    			return false;
    		}
    }
}
