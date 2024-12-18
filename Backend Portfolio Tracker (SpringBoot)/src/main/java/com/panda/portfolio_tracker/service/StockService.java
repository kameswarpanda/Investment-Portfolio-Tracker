package com.panda.portfolio_tracker.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.panda.portfolio_tracker.entity.Stock;
import com.panda.portfolio_tracker.repository.StockRepository;

@Service
public class StockService {

    @Autowired
    private StockRepository stockRepository;

    public List<Stock> getAllStocks() {
        return stockRepository.findAll();
    }

    public Stock addStock(Stock stock) {
        return stockRepository.save(stock);
    }

    public Stock updateStock(Long id, Stock stock) {
        Stock existingStock = stockRepository.findById(id).orElseThrow(() -> new RuntimeException("Stock not found"));
        existingStock.setName(stock.getName());
        existingStock.setTicker(stock.getTicker());
        existingStock.setBuyPrice(stock.getBuyPrice());
        existingStock.setQuantity(stock.getQuantity());
        return stockRepository.save(existingStock);
    }

    public void deleteStock(Long id) {
        stockRepository.deleteById(id);
    }
}
