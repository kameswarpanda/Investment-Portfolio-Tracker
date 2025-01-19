import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  apiKey: string = 'ctnf3upr01qn483kc5sgctnf3upr01qn483kc5t0';
  apiUrl: string = 'https://finnhub.io/api/v1/quote'; // API Endpoint
  stocks: string[] = ['AAPL', 'GOOG', 'MSFT', 'AMZN', 'TSLA'];
  portfolio: { symbol: string; quantity: number; price: number }[] = [];
  totalPortfolioValue: number = 0;
  topPerformingStock: { symbol: string; price: number } | null = null;
  chart: Chart | null = null;

  constructor() {}

  ngOnInit(): void {
    this.initializePortfolio();
    this.fetchStockPrices();
  }

  initializePortfolio(): void {
    this.portfolio = this.stocks.map((symbol) => ({
      symbol,
      quantity: 2,
      price: 0,
    }));
  }

  async fetchStockPrices(): Promise<void> {
    try {
      const stockPromises = this.portfolio.map((stock) =>
        fetch(`${this.apiUrl}?symbol=${stock.symbol}&token=${this.apiKey}`)
          .then((res) => res.json())
          .then((data) => ({ symbol: stock.symbol, price: data.c })) // 'c' is assumed to be the current price
      );

      const stockData = await Promise.all(stockPromises);

      stockData.forEach((data, index) => {
        this.portfolio[index].price = data.price;
      });

      this.updatePortfolioMetrics();
    } catch (error) {
      console.error('Error fetching stock prices:', error);
    }
  }

  updatePortfolioMetrics(): void {
    // Calculate total portfolio value
    this.totalPortfolioValue = this.portfolio.reduce(
      (sum, stock) => sum + stock.price * stock.quantity,
      0
    );

    // Determine the top-performing stock
    this.topPerformingStock = this.portfolio.reduce((top, stock) =>
      stock.price > (top?.price || 0) ? stock : top
    );

    this.updateChart();
  }

  updateChart(): void {
    if (this.chart) {
      this.chart.destroy(); // Destroy the old chart before creating a new one
    }

    const ctx = (document.getElementById('portfolioChart') as HTMLCanvasElement).getContext('2d')!;
    this.chart = new Chart(ctx, {
      type: 'pie',
      data: {
        labels: this.portfolio.map((stock) => stock.symbol),
        datasets: [
          {
            data: this.portfolio.map((stock) => stock.price * stock.quantity),
            backgroundColor: ['#007bff', '#28a745', '#ffc107', '#dc3545', '#17a2b8'],
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'bottom',
          },
        },
      },
    });
  }
}
