package com.panda.portfolio_tracker.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.panda.portfolio_tracker.entity.Users;

public interface UserRepo extends JpaRepository<Users, String>{

}
