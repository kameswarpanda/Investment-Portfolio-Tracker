import { CommonModule } from '@angular/common';
import {
  Component,
  Inject,
  OnDestroy,
  OnInit,
  PLATFORM_ID,
} from '@angular/core';
import { Chart } from 'chart.js';
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { MasterService } from '../../services/master.service';

interface Stock {
  id: number;
  stockName: string;
  ticker: string;
  quantity: number;
  buyPrice: number;
  currentPrice: number;
  gainLoss: number;
}

@Component({
  selector: 'app-portfolio-details',
  imports: [CommonModule],
  templateUrl: './portfolio-details.component.html',
  styleUrls: ['./portfolio-details.component.css'],
})
export class PortfolioDetailsComponent implements OnInit, OnDestroy {
  stocks: Stock[] = [];
  private chart: Chart | undefined;

  constructor(
    private masterSvr: MasterService, private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit(): void {
    this.fetchStocks();
    if (isPlatformBrowser(this.platformId)) {
      this.renderChart();
    }
  }

  initializeStock(): Stock {
    return {
      id: 0,
      stockName: '',
      ticker: '',
      quantity: 0,
      buyPrice: 0,
      currentPrice: 0,
      gainLoss: 0,
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
            gainLoss: stock.currentPrice - stock.currentPrice,
          }));

          // this.updatePortfolioMetrics();
        },
        error: (err) => console.error('Error fetching stocks:', err),
      });
    }
  }

  ngOnDestroy(): void {
    if (this.chart) {
      this.chart.destroy();
    }
  }

  renderChart(): void {
    if (isPlatformBrowser(this.platformId)) {
      const ctx = document.getElementById(
        'performanceChart'
      ) as HTMLCanvasElement;

      if (ctx) {
        this.chart = new Chart(ctx, {
          type: 'line',
          data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'], // Example months
            datasets: this.stocks.map((stock) => ({
              label: stock.stockName,
              data: [stock.buyPrice, stock.currentPrice], // Example data
              borderColor: this.randomColor(),
              fill: false,
            })),
          },
          options: {
            responsive: true,
            plugins: {
              legend: {
                position: 'top',
              },
            },
            scales: {
              x: {
                title: {
                  display: true,
                  text: 'Months',
                },
              },
              y: {
                title: {
                  display: true,
                  text: 'Price (USD)',
                },
              },
            },
          },
        });
      }
    }
  }

  randomColor(): string {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  }

  navigateTo(page: string): void {
    this.router.navigate([page]);
  }
}
