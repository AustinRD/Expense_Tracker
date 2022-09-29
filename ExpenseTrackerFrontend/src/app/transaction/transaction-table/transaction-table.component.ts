import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from 'src/app/models/transaction-category.model';
import { Type } from 'src/app/models/transaction-type.model';
import { Transaction } from 'src/app/models/transaction.model';
import { TransactionDataService } from 'src/app/transaction-data.service';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-transaction-table',
  templateUrl: './transaction-table.component.html',
  styleUrls: ['./transaction-table.component.css']
})
export class TransactionTableComponent implements OnInit {
  transactionList$!:Observable<Transaction[]>;
  transactionTypesList$!:Observable<Type[]>;
  transactionCategoriesList$!:Observable<Category[]>;

  transactionTypesMap:Map<number, string> = new Map();
  transactionTypesList:Type[] = [];

  transactionCategoriesMap:Map<number, string[]> = new Map();
  transactionCategoriesList:Category[]=[];

  modalTitle: string = "";
  transaction: Transaction = {
    id: 0,
    userId: 1,
    transactionAmount: 0,
    transactionDate: new Date().toISOString().split(/T/)[0].replace(/\..+/, ''),
    transactionTypeId: 0,
    transactionCategoryId: 0,
    transactionDescription: undefined,
    recipient: undefined,
    isSubscription: false
  };

  constructor(private service: TransactionDataService, private currencyPipe: CurrencyPipe) { }

  ngOnInit(): void {
    this.transactionList$ = this.service.getTransactionList();
    this.transactionTypesList$ = this.service.getTransactionTypesList();
    this.transactionCategoriesList$ = this.service.getTransactionCategoriesList();
    this.initializeTransactionTypesMap();
    this.initializeTransactionCategoriesMap();
  }
  initializeTransactionTypesMap() {
    this.service.getTransactionTypesList().subscribe(data => {
      this.transactionTypesList = data;

      for(let i = 0; i < data.length; i++) {
        this.transactionTypesMap.set(this.transactionTypesList[i].id, this.transactionTypesList[i].type);
      }
    });
  }
  initializeTransactionCategoriesMap() {
    this.service.getTransactionCategoriesList().subscribe(data => {
      this.transactionCategoriesList = data;

      let subcategory = "";

      for(let i = 0; i < data.length; i++) {
        subcategory = this.transactionCategoriesList[i].subcategory != null ? this.transactionCategoriesList[i].subcategory!.toString() : "General";
        this.transactionCategoriesMap.set(this.transactionCategoriesList[i].id, [this.transactionCategoriesList[i].category, subcategory]);
      }
    });
  }

  addModal() {
    this.transaction = {
      id: 0,
      userId: 1,
      transactionAmount: 0,
      transactionDate: new Date().toISOString().split(/T/)[0].replace(/\..+/, ''),
      transactionTypeId: 0,
      transactionCategoryId: 0,
      transactionDescription: undefined,
      recipient: undefined,
      isSubscription: false
    }
    this.modalTitle = "Add Transaction";
  }
  editModal(transaction: Transaction) {
    transaction.transactionDate = transaction.transactionDate.split('T')[0];
    this.transaction = transaction;
    this.modalTitle = "Edit Transaction";
  }
  deleteModal(transaction: Transaction) {
    if(confirm(`Are you sure you want to delete this transaction?`)) {
      this.service.deleteTransaction(transaction.id).subscribe(res => {
        this.transactionList$ = this.service.getTransactionList();
      });
    }
  }
  closeModal() {
    this.transactionList$ = this.service.getTransactionList();
  }
}