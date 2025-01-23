package com.task.portfoliotracker.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.task.portfoliotracker.entity.Stock;
import com.task.portfoliotracker.entity.User;
import com.task.portfoliotracker.repository.StockRepository;
import com.task.portfoliotracker.repository.UserRepository;

@Service
public class StockService {
    @Autowired
    private StockRepository stockRepository;

    @Autowired
    private UserRepository userRepository;

    // Fetch all stocks for a specific user
    public List<Stock> getAllStocksForUser(Long userId) {
        return stockRepository.findByUserId(userId);
    }

    // Save a stock for a specific user
    public Stock saveStockForUser(Long userId, Stock stock) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("User not found with ID: " + userId));
        stock.setUser(user); // Associate the stock with the user
        return stockRepository.save(stock);
    }

    // Update a stock for a specific user
    public Stock updateStockForUser(Long userId, Long stockId, Stock stock) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("User not found with ID: " + userId));
        Stock existingStock = stockRepository.findById(stockId)
                .orElseThrow(() -> new IllegalArgumentException("Stock not found with ID: " + stockId));

        if (!existingStock.getUser().getId().equals(userId)) {
            throw new IllegalArgumentException("Stock does not belong to this user");
        }

        // Update stock fields
        existingStock.setTicker(stock.getTicker());
        existingStock.setStockName(stock.getStockName());
        existingStock.setCurrentPrice(stock.getCurrentPrice());
        existingStock.setQuantity(stock.getQuantity());

        return stockRepository.save(existingStock);
    }

    // Delete a stock for a specific user
    public void deleteStockForUser(Long userId, Long stockId) {
        Stock existingStock = stockRepository.findById(stockId)
                .orElseThrow(() -> new IllegalArgumentException("Stock not found with ID: " + stockId));

        if (!existingStock.getUser().getId().equals(userId)) {
            throw new IllegalArgumentException("Stock does not belong to this user");
        }

        stockRepository.delete(existingStock);
    }
}
