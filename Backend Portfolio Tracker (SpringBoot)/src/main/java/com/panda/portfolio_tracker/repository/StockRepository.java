package com.panda.portfolio_tracker.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.panda.portfolio_tracker.entity.Stock;

public interface StockRepository extends JpaRepository<Stock, Long>{

}
