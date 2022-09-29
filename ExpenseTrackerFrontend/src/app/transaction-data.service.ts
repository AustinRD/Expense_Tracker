import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TransactionDataService {

  readonly transactionDataURL = "https://localhost:7243/api";

  constructor(private http : HttpClient) { }

  getTransactionList():Observable<any[]> {
    return this.http.get<any>(this.transactionDataURL + '/transactions');
  }
  addTransaction(data:any) {
    return this.http.post(this.transactionDataURL + '/transactions', data);
  }
  updateTransaction(id: number|string, data: any) {
    return this.http.put(this.transactionDataURL + `/transactions/${id}`, data);
  }
  deleteTransaction(id: number|string) {
    return this.http.delete(this.transactionDataURL + `/transactions/${id}`);
  }


  // Transaction Types
  getTransactionTypesList():Observable<any[]> {
    return this.http.get<any>(this.transactionDataURL + '/transactionTypes');
  }
  addTransactionTypes(data:any) {
    return this.http.post(this.transactionDataURL + '/transactionTypes', data);
  }
  updateTransactionTypes(id: number|string, data: any) {
    return this.http.put(this.transactionDataURL + `/transactionTypes/${id}`, data);
  }
  deleteTransactionTypes(id: number|string) {
    return this.http.delete(this.transactionDataURL + `/transactionTypes/${id}`);
  }

  // Transaction Categories
  getTransactionCategoriesList():Observable<any[]> {
    return this.http.get<any>(this.transactionDataURL + '/transactionCategories');
  }
  addTransactionCategories(data:any) {
    return this.http.post(this.transactionDataURL + '/transactionCategories', data);
  }
  updateTransactionCategories(id: number|string, data: any) {
    return this.http.put(this.transactionDataURL + `/transactionCategories/${id}`, data);
  }
  deleteTransactionCategories(id: number|string) {
    return this.http.delete(this.transactionDataURL + `/transactionCategories/${id}`);
  }
}
