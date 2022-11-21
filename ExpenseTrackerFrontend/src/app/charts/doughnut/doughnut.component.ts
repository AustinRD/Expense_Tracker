import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { Transaction } from 'src/app/models/transaction.model';
import { Category } from 'src/app/models/transaction-category.model';
import { TransactionDataService } from 'src/app/transaction-data.service';

@Component({
  selector: 'app-doughnut',
  templateUrl: './doughnut.component.html',
  styleUrls: ['./doughnut.component.css']
})
export class DoughnutComponent implements OnInit {
  transactionList$!:Observable<Transaction[]>;
  transactionCategoriesList$!:Observable<Category[]>;

  transactionCategoriesMap:Map<number, string[]> = new Map();
  transactionCategoriesList:Category[]=[];
  transaction:Transaction[]=[];

  modalTitle: string = "";

  chartData?: Object[];
  map: Object = 'fill';
  datalabel: Object = {
    visible: true,
    name: 'category',
    position: 'Inside',
    font: {
      color: '#FFF'
    }
  };
  legendSettings: Object = {
    visible: true,
    position: 'Right',
    textStyle: {
      color: '#FFF'
    }
  };
  palette = ["#E94649", "#F6B53F", "#6FAAB0", "#FF33F3","#228B22","#3399FF"];


  constructor(private service: TransactionDataService) { }

  ngOnInit(): void {
    // Transaction list needed for chart data
    this.transactionList$ = this.service.getTransactionList();
    this.transactionCategoriesList$ = this.service.getTransactionCategoriesList();
    this.initializeTransactionCategoriesMap();
    this.initializeChartData();
  }
  initializeTransactionCategoriesMap() {
    this.service.getTransactionCategoriesList().subscribe(data => {
      this.transactionCategoriesList = data;

      let subcategory = "";

      for(let i = 0; i < data.length; i++) {
        subcategory = this.transactionCategoriesList[i].subcategory != null && this.transactionCategoriesList[i].subcategory != "" ? this.transactionCategoriesList[i].subcategory!.toString() : "General";
        this.transactionCategoriesMap.set(this.transactionCategoriesList[i].id, [this.transactionCategoriesList[i].category, subcategory]);
      }
    });
  }
  /*
    TODO: Chart data currently represents all-time data, it should be monthly from the first 
    of each month to the last day, or contain optional monthly/annual filters.
  */
  initializeChartData() { 
    this.service.getTransactionList().subscribe(data => {
      this.transaction = data;
      var categories = [];
      var categoryMap = new Map();
      for(let i = 0; i < data.length; i++) {
        if(categoryMap.has(this.transactionCategoriesMap.get(data[i].transactionCategoryId)![0])) {
          categoryMap.set(this.transactionCategoriesMap.get(data[i].transactionCategoryId)![0], categoryMap.get(this.transactionCategoriesMap.get(data[i].transactionCategoryId)![0]) + data[i].transactionAmount);
        } else {
          categoryMap.set(this.transactionCategoriesMap.get(data[i].transactionCategoryId)![0], data[i].transactionAmount);
        }
      }
      categories = Array.from(categoryMap, ([category, total]) => ({category, total}))

      this.chartData = categories;
    });
  }
}
