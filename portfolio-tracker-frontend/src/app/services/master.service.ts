import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MasterService {

  constructor(private http: HttpClient) { }

  apiURL: String = 'http://localhost:8080/api/';

  //for user login and registration
  login(obj: any) {
    return this.http.post(this.apiURL+"users/login", obj);
  }

  register(obj: any) {
    return this.http.post(this.apiURL+"users/register", obj);
  }


  //for stocks CURD operations

  getPortfolioDetails(userId: any, obj: any) {
    return this.http.get(this.apiURL+"stocks/"+userId, obj);
  }

  addStock(userId: any, obj: any) {
    return this.http.post(this.apiURL+"stocks/"+userId, obj);
  }

  updateStock(userId: any, stockId: any ,obj: any) {
    return this.http.put(this.apiURL+"stocks/"+userId+"/"+stockId, obj);
  }

  deleteStock(userId: any, stockId: any) {
    return this.http.delete(this.apiURL+"stocks/"+userId+"/"+stockId);
  }

}
