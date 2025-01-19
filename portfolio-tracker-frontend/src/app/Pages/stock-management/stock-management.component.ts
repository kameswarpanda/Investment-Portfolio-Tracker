import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

interface Stock {
  name: string;
  symbol: string;
  quantity: number;
  buyPrice: number;
  currentPrice: number;
  isEditing?: boolean;
}

declare var bootstrap: any;

@Component({
  selector: 'app-stock-management',
  imports: [CommonModule, FormsModule],
  templateUrl: './stock-management.component.html',
  styleUrl: './stock-management.component.css',
})
export class StockManagementComponent {
  stocks: Stock[] = [];
  currentStock: Stock = this.initializeStock();
  isEditing = false;
  stockToDelete: Stock | null = null;
  searchTerm: string = '';

  ngOnInit(): void {
    // Mock data for testing
    this.stocks = [
      {
        name: 'Apple',
        symbol: 'AAPL',
        quantity: 10,
        buyPrice: 150,
        currentPrice: 175,
      },
      {
        name: 'Google',
        symbol: 'GOOG',
        quantity: 5,
        buyPrice: 1200,
        currentPrice: 1250,
      },
    ];
  }

  initializeStock(): Stock {
    return { name: '', symbol: '', quantity: 0, buyPrice: 0, currentPrice: 0 };
  }

  saveStock(): void {
    if (this.isEditing) {
      this.isEditing = false;
    } else {
      this.stocks.push({
        ...this.currentStock,
        currentPrice: this.currentStock.buyPrice,
      });
    }
    this.currentStock = this.initializeStock();
  }

  editStock(stock: Stock): void {
    this.currentStock = { ...stock };
    this.isEditing = true;
  }

  confirmDelete(stock: Stock): void {
    this.stockToDelete = stock;
    const deleteModal = new bootstrap.Modal(
      document.getElementById('deleteModal')!
    );
    deleteModal.show();
  }

  deleteStock(stock: Stock): void {
    this.stocks = this.stocks.filter((s) => s !== stock);
    this.stockToDelete = null;
    bootstrap.Modal.getInstance(
      document.getElementById('deleteModal')!
    )?.hide();
  }

  sortStocks(key: keyof Stock): void {
    this.stocks.sort((a, b) => {
      if (a[key] === undefined || b[key] === undefined) {
        return 0;
      }
      return a[key] > b[key] ? 1 : -1;
    });
  }

  get filteredStocks(): Stock[] {
    return this.stocks.filter(
      (stock) =>
        stock.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        stock.symbol.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  showAddForm(): void {
    this.isEditing = false;
    this.currentStock = this.initializeStock();
  }
}
