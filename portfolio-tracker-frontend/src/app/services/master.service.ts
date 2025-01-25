import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MasterService {

  private apiKey = 'ctnf3upr01qn483kc5sgctnf3upr01qn483kc5t0';

  constructor(private http: HttpClient) { }

  apiURL: String = 'https://evening-beyond-95642-0f9a93797e2c.herokuapp.com/api/';

  getCurrentPrice(ticker: string) {
    const url = `https://finnhub.io/api/v1/quote?symbol=${ticker}&token=${this.apiKey}`;
    return this.http.get<any>(url);
  }

  //for user login and registration
  login(obj: any) {
    return this.http.post(this.apiURL+"users/login", obj);
  }

  register(obj: any) {
    return this.http.post(this.apiURL+"users/register", obj);
  }


  //for stocks CURD operations

  getPortfolioDetails(userId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiURL}stocks/${userId}`);
  }

  addStock(userId: any, obj: any) {
    return this.http.post(this.apiURL+"stocks/"+userId, obj);
  }

  updateStock(userId: any, stockId: number, stock: any): Observable<any> {
    return this.http.put(`${this.apiURL}stocks/${userId}/${stockId}`, stock);
  }

  deleteStock(userId: any, stockId: number): Observable<string> {
    return this.http.delete<string>(
      `${this.apiURL}stocks/${userId}/${stockId}`,
      { responseType: 'text' as 'json' } // Handle plain text response
    );
  }

}
