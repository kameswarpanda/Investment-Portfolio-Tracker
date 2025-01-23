package com.task.portfoliotracker.repository;


import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.task.portfoliotracker.entity.Stock;

public interface StockRepository extends JpaRepository<Stock, Long> {
	List<Stock> findByUserId(Long userId);
}

