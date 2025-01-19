import { CommonModule } from '@angular/common';
import { Component, Inject, OnDestroy, OnInit, PLATFORM_ID } from '@angular/core';
import { Chart } from 'chart.js';
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';

interface Stock {
  name: string;
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
  styleUrls: ['./portfolio-details.component.css']
})
export class PortfolioDetailsComponent implements OnInit, OnDestroy {
  stocks: Stock[] = [
    {
      name: 'Apple Inc.',
      ticker: 'AAPL',
      quantity: 50,
      buyPrice: 145,
      currentPrice: 150,
      gainLoss: 3.45
    },
    {
      name: 'Microsoft Corp.',
      ticker: 'MSFT',
      quantity: 30,
      buyPrice: 300,
      currentPrice: 310,
      gainLoss: 3.33
    },
    {
      name: 'Tesla Inc.',
      ticker: 'TSLA',
      quantity: 20,
      buyPrice: 650,
      currentPrice: 620,
      gainLoss: -4.62
    }
  ];

  private chart: Chart | undefined;

  constructor(
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.renderChart();
    }
  }

  ngOnDestroy(): void {
    if (this.chart) {
      this.chart.destroy();
    }
  }

  renderChart(): void {
    if (isPlatformBrowser(this.platformId)) {
      const ctx = document.getElementById('performanceChart') as HTMLCanvasElement;

      if (ctx) {
        this.chart = new Chart(ctx, {
          type: 'line',
          data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'], // Example months
            datasets: this.stocks.map(stock => ({
              label: stock.name,
              data: [stock.buyPrice, stock.currentPrice], // Example data
              borderColor: this.randomColor(),
              fill: false
            }))
          },
          options: {
            responsive: true,
            plugins: {
              legend: {
                position: 'top'
              }
            },
            scales: {
              x: {
                title: {
                  display: true,
                  text: 'Months'
                }
              },
              y: {
                title: {
                  display: true,
                  text: 'Price (USD)'
                }
              }
            }
          }
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
