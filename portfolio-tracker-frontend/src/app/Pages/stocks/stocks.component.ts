import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-stocks',
  imports: [CommonModule],
  templateUrl: './stocks.component.html',
  styleUrl: './stocks.component.css'
})
export class StocksComponent {
  stocks: any[] = []; // All stocks
  visibleStocks: any[] = []; // Subset of stocks visible initially
  topGainers: any[] = [];
  topLosers: any[] = [];
  apiKey = 'ctnf3upr01qn483kc5sgctnf3upr01qn483kc5t0';
  showAll = false; // Controls "See More" visibility
  isLoading = true;

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    const stockSymbols = [
      { symbol: 'AAPL', name: 'Apple' },
      { symbol: 'GOOGL', name: 'Alphabet' },
      { symbol: 'MSFT', name: 'Microsoft' },
      { symbol: 'TSLA', name: 'Tesla' },
      { symbol: 'AMZN', name: 'Amazon' },
      { symbol: 'NFLX', name: 'Netflix' },
      { symbol: 'NVDA', name: 'NVIDIA' },
      { symbol: 'META', name: 'Meta Platforms' },
      { symbol: 'BABA', name: 'Alibaba' },
      { symbol: 'DIS', name: 'Disney' },
      { symbol: 'ADBE', name: 'Adobe' },
      { symbol: 'ORCL', name: 'Oracle' },
      { symbol: 'INTC', name: 'Intel' },
      { symbol: 'AMD', name: 'AMD' },
      { symbol: 'PYPL', name: 'PayPal' },
      { symbol: 'SPOT', name: 'Spotify' },
      { symbol: 'UBER', name: 'Uber' },
      { symbol: 'SQ', name: 'Square' },
      { symbol: 'TWTR', name: 'Twitter' },
    ];

    const requests = stockSymbols.map((stock) =>
      this.http
        .get(`https://finnhub.io/api/v1/quote?symbol=${stock.symbol}&token=${this.apiKey}`)
        .toPromise()
        .then((data: any) => ({
          ...stock,
          price: data.c,
          change: data.d,
          changePercent: data.dp,
          logo: `https://logo.clearbit.com/${stock.symbol.toLowerCase()}.com`,
        }))
    );

    Promise.all(requests).then((results) => {
      this.stocks = results;
      this.visibleStocks = this.stocks.slice(0, 7); // Show initial 6 stocks
      this.topGainers = [...this.stocks]
        .sort((a, b) => b.changePercent - a.changePercent)
        .slice(0, 7);
      this.topLosers = [...this.stocks]
        .sort((a, b) => a.changePercent - b.changePercent)
        .slice(0, 7);
      this.isLoading = false;
    });
  }

  toggleStocks(): void {
    this.showAll = !this.showAll;
    this.visibleStocks = this.showAll ? this.stocks : this.stocks.slice(0, 6);
  }

  viewStockDetails(stock: any): void {
    localStorage.setItem('selectedStock', JSON.stringify(stock));
    this.router.navigateByUrl('/stock-details');
  }
}
