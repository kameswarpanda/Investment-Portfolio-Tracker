package com.task.portfoliotracker.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.task.portfoliotracker.entity.Stock;
import com.task.portfoliotracker.services.StockService;

@RestController
@RequestMapping("/api/stocks")
public class StockController {
    @Autowired
    private StockService stockService;

    @GetMapping("/{userId}")
    public List<Stock> getStocksForUser(@PathVariable Long userId) {
        return stockService.getAllStocksForUser(userId);
    }

    @PostMapping("/{userId}")
    public Stock buyStock(@PathVariable Long userId, @RequestBody Stock stock) {
        return stockService.saveStockForUser(userId, stock);
    }

    @PutMapping("/{userId}/{stockId}")
    public Stock updateStock(@PathVariable Long userId, @PathVariable Long stockId, @RequestBody Stock stock) {
        return stockService.updateStockForUser(userId, stockId, stock);
    }

    @DeleteMapping("/{userId}/{stockId}")
    public String deleteStock(@PathVariable Long userId, @PathVariable Long stockId) {
        stockService.deleteStockForUser(userId, stockId);
        return "Stock deleted successfully for user " + userId;
    }
}
