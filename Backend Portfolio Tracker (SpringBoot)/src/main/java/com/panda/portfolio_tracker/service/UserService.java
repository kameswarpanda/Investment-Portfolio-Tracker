package com.panda.portfolio_tracker.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.panda.portfolio_tracker.entity.Users;
import com.panda.portfolio_tracker.repository.UserRepo;
import com.panda.portfolio_tracker.requests.LoginRequest;

@Service
public class UserService {
	
	@Autowired
	UserRepo userRepo;
	
	public Users addUser(Users users) {
		
		return userRepo.save(users);
	}
	
	public boolean loginUser(LoginRequest loginRequest) {
		
		Optional<Users> user = userRepo.findById(loginRequest.getUserId());
		Users user1 = user.get();
		
		
		if(user1 == null) {
			return false;
		}
		
		if(!user1.getPassword().equals(loginRequest.getPassword())) {
			return false;
		}
		
		
		return true;
	}
	
}
