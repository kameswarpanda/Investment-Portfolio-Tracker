package com.panda.portfolio_tracker.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.Data;

@Data
@Entity
public class Users {
	
	@Id
	private String email;
	
	private String name;
	
	private String Password;

}
