import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { TransactionDataService } from 'src/app/transaction-data.service';
import { Type } from '../../models/transaction-type.model';

@Component({
  selector: 'app-transaction-type-list',
  templateUrl: './transaction-type-list.component.html',
  styleUrls: ['./transaction-type-list.component.css']
})
export class TransactionTypeListComponent implements OnInit {
  transactionTypesList$!:Observable<Type[]>;

  constructor(private service: TransactionDataService) { }

  ngOnInit(): void {
    this.transactionTypesList$ = this.service.getTransactionTypesList();
  }
}
