import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MasterService } from '../../services/master.service';
import { RouterLink } from '@angular/router';

interface Stock {
  id: number;
  stockName: string;
  ticker: string;
  quantity: number;
  buyPrice: number;
  currentPrice: number;
}

declare var bootstrap: any;

@Component({
  selector: 'app-stock-management',
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './stock-management.component.html',
  styleUrl: './stock-management.component.css',
})
export class StockManagementComponent implements OnInit {
  stocks: Stock[] = [];
  currentStock: Stock = this.initializeStock();
  stockToDelete: Stock | null = null;
  searchTerm: string = '';

  constructor(private masterSvr: MasterService) {}

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
        },
        error: (err) => console.error('Error fetching stocks:', err),
      });
    }
  }

  saveStock(): void {
    const userId = localStorage.getItem('stockUser');
    if (this.currentStock) {
      const userId = localStorage.getItem('stockUser');
      this.masterSvr.updateStock(userId, this.currentStock.id, this.currentStock).subscribe({
        next: (updatedStock) => {
          console.log('Stock updated successfully:', updatedStock);
  
          // Find the index of the updated stock and replace it in the local array
          const index = this.stocks.findIndex((s) => s.id === updatedStock.id);
          if (index !== -1) {
            this.stocks[index] = updatedStock;
          }
  
          // Show an alert for successful update
          alert(`Stock "${updatedStock.stockName}" updated successfully!`);
  
          // Reset the stockToEdit and close the modal
          this.currentStock = this.initializeStock();
          bootstrap.Modal.getInstance(document.getElementById('editModal')!)?.hide();
        },
        error: (error) => {
          console.error('Error updating stock:', error);
          alert('Failed to update the stock. Please try again.');
        },
      });
    }
  }

  editStock(stock: Stock): void {
    this.currentStock = { ...stock };
  }

  confirmDelete(stock: Stock): void {
    this.stockToDelete = stock;
    const deleteModal = new bootstrap.Modal(document.getElementById('deleteModal')!);
    deleteModal.show();
  }

  deleteStock(stock: Stock): void {
    const userId = localStorage.getItem('stockUser');
    if (userId && this.stockToDelete) {
      this.masterSvr.deleteStock(userId, this.stockToDelete.id).subscribe({
        next: (response: string) => {
          console.log('Delete successful:', response);
          alert('Stock deleted successfully!');
          // Remove the stock from the local list
          this.stocks = this.stocks.filter((s) => s !== this.stockToDelete);
          this.stockToDelete = null;
  
          // Hide the modal
          bootstrap.Modal.getInstance(document.getElementById('deleteModal')!)?.hide();
        },
        error: (error) => {
          console.error('Error deleting stock:', error);
        },
      });
    }
  }
  

  sortStocks(key: keyof Stock): void {
    this.stocks.sort((a, b) => (a[key] > b[key] ? 1 : -1));
  }

  get filteredStocks(): Stock[] {
    return this.stocks.filter(
      (stock) =>
        stock.stockName.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        stock.ticker.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }
}
