package com.panda.portfolio_tracker.requests;

import lombok.Data;

@Data
public class LoginRequest {
	
	private String userId;
	
	private String password;
}
