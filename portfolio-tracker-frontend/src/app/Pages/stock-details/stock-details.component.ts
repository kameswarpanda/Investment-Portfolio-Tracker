import { HttpClient } from '@angular/common/http';
import { Component, inject, Inject, PLATFORM_ID } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { MasterService } from '../../services/master.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-stock-details',
  imports: [FormsModule, RouterLink],
  templateUrl: './stock-details.component.html',
  styleUrl: './stock-details.component.css',
})
export class StockDetailsComponent {
  selectedStock: any = {
    name: '',
    symbol: '',
    logo: '',
    price: 0,
    open: 0,
    high: 0,
    volume: '',
    marketCap: '',
    week52High: '',
    week52Low: '',
  };

  quantity: number = 0;
  userId = localStorage.getItem('stockUser');
  private historicalData: number[] = [];
  private labels: string[] = [];
  private bootstrap: any;

  constructor(
    private router: Router,
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit(): void {
    this.selectedStock = JSON.parse(
      localStorage.getItem('selectedStock') || '{}'
    );
    this.fetchHistoricalData();
    if (isPlatformBrowser(this.platformId)) {
      this.bootstrap = require('bootstrap');
    }
  }

  fetchHistoricalData() {
    const stockSymbol = this.selectedStock.symbol;
    const apiUrl = `https://api.twelvedata.com/time_series?symbol=${stockSymbol}&interval=1day&outputsize=30&apikey=ctnf3upr01qn483kc5sg`;
    this.http.get<any>(apiUrl).subscribe((response) => {
      this.labels = response.dates;
      this.historicalData = response.prices;
    });
  }

  MasterSrv = inject(MasterService);

  saveStock() {
    const stockData = {
      ticker: this.selectedStock.symbol,
      stockName: this.selectedStock.name,
      currentPrice: this.selectedStock.price,
      quantity: this.selectedStock.quantity,
    };
    console.log(stockData);
    if (
      this.selectedStock.quantity == 0 ||
      this.selectedStock.quantity == null
    ) {
      // alert('Please enter a valid quantity');

      const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.onmouseenter = Swal.stopTimer;
          toast.onmouseleave = Swal.resumeTimer;
        },
      });
      Toast.fire({
        icon: 'error',
        title: 'please enter a valid quantity.',
      });

      return;
    } else {
      this.MasterSrv.addStock(this.userId, stockData).subscribe(() => {
        // alert('Stock added successfully!');

        const Toast = Swal.mixin({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
          },
        });
        Toast.fire({
          icon: 'success',
          title: 'stock added successfully!',
        });

        this.router.navigateByUrl('/dashboard');
      });
    }
  }

  goBack() {
    this.router.navigateByUrl('/stocks');
  }
}
