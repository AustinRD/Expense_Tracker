import { Observable, withLatestFrom } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { Transaction } from 'src/app/models/transaction.model';
import { TransactionDataService } from 'src/app/transaction-data.service';
import { Thickness } from '@syncfusion/ej2-angular-charts';

@Component({
  selector: 'app-spline',
  templateUrl: './spline.component.html',
  styleUrls: ['./spline.component.css']
})
export class SplineComponent implements OnInit {
  transactionList$!:Observable<Transaction[]>;
  transaction:Transaction[] = [];

  splineData?: Object[];
  primaryXAxis: Object = {
    valueType: 'Category',
    title: 'Date',
    titleStyle: {
      color: 'white'
    }
  }
  primaryYAxis: Object = {
    title: 'Amount (USD - $)',
    titleStyle: {
      color: 'white'
    }
  }
  title: string = "Expenses";
  titleStyle: Object = {
    color: 'white'
  }
  marker: Object = {
    visible: true
  }
  constructor(private service: TransactionDataService) { }

  ngOnInit(): void {
    this.transactionList$ = this.service.getTransactionList();
    this.initializeSplineData();
  }
  initializeSplineData() {
    this.service.getTransactionList().subscribe(data => {
      this.transaction = data;
      
      var transactions = [];
      var transactionMap = new Map();
      for(let i = 0; i < data.length; ++i) {
        if(transactionMap.has(data[i].transactionDate.split('T')[0])) {
          transactionMap.set(data[i].transactionDate.split('T')[0], transactionMap.get(data[i].transactionDate.split('T')[0]) + data[i].transactionAmount);
        } else {
          transactionMap.set(data[i].transactionDate.split('T')[0], data[i].transactionAmount);
        }
      }
      transactions = Array.from(transactionMap, ([transactionDate, transactionAmount]) => ({transactionDate, transactionAmount}))
      this.splineData = transactions;

      console.log(this.splineData);
    });
  }

}
