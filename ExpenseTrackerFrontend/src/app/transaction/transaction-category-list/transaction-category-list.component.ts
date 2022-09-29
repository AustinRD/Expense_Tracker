import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { TransactionDataService } from 'src/app/transaction-data.service';

@Component({
  selector: 'app-transaction-category-list',
  templateUrl: './transaction-category-list.component.html',
  styleUrls: ['./transaction-category-list.component.css']
})
export class TransactionCategoryListComponent implements OnInit {
  transactionCategoriesList$!:Observable<any[]>;

  constructor(public service: TransactionDataService) { }

  ngOnInit(): void {
    this.transactionCategoriesList$ = this.service.getTransactionCategoriesList();
  }
}
