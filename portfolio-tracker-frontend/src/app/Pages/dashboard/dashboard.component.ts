import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import Chart from 'chart.js/auto';
import { MasterService } from '../../services/master.service';

interface Stock {
  id: number;
  stockName: string;
  ticker: string;
  quantity: number;
  buyPrice: number;
  currentPrice: number;
}

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, RouterLink],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  stocks: Stock[] = [];
  totalPortfolioValue: number = 0;
  topPerformingStock: { ticker: string; currentPrice: number } | null = null;
  chart: Chart | null = null;

  constructor(private masterSvr: MasterService, private router: Router) {}

  ngOnInit(): void {
    this.fetchStocks();
  }

  initializeStock(): Stock {
    return {
      id: 0,
      stockName: '',
      ticker: '',
      quantity: 0,
      buyPrice: 0,
      currentPrice: 0,
    };
  }

  fetchStocks(): void {
    const userId = localStorage.getItem('stockUser');
    if (userId) {
      this.masterSvr.getPortfolioDetails(userId).subscribe({
        next: (response: any[]) => {
          this.stocks = response.map((stock) => ({
            id: stock.id,
            stockName: stock.stockName,
            ticker: stock.ticker,
            quantity: stock.quantity,
            buyPrice: stock.currentPrice, // Assuming buyPrice is the same as currentPrice initially
            currentPrice: stock.currentPrice,
          }));

          this.updatePortfolioMetrics();
        },
        error: (err) => console.error('Error fetching stocks:', err),
      });
    }
  }

  navigateTo(page: string): void {
    this.router.navigateByUrl(page);
  }

  updatePortfolioMetrics(): void {
    // Calculate total portfolio value
    this.totalPortfolioValue = this.stocks.reduce(
      (sum, stock) => sum + stock.currentPrice * stock.quantity,
      0
    );

    // Determine the top-performing stock
    this.topPerformingStock = this.stocks.reduce((top, stock) =>
      stock.currentPrice > (top?.currentPrice || 0) ? stock : top
    );

    this.updateChart();
  }

  updateChart(): void {
    if (this.chart) {
      this.chart.destroy(); // Destroy the old chart before creating a new one
    }

    const ctx = (
      document.getElementById('portfolioChart') as HTMLCanvasElement
    ).getContext('2d')!;
    this.chart = new Chart(ctx, {
      type: 'pie',
      data: {
        labels: this.stocks.map((stock) => stock.ticker),
        datasets: [
          {
            data: this.stocks.map(
              (stock) => stock.currentPrice * stock.quantity
            ),
            backgroundColor: [
              '#007bff',
              '#28a745',
              '#ffc107',
              '#dc3545',
              '#17a2b8',
            ],
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
