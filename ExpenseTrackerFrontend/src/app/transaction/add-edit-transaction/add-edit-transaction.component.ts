import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from 'src/app/models/transaction-category.model';
import { Type } from 'src/app/models/transaction-type.model';
import { Transaction } from 'src/app/models/transaction.model';
import { TransactionDataService } from 'src/app/transaction-data.service';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-add-edit-transaction',
  templateUrl: './add-edit-transaction.component.html',
  styleUrls: ['./add-edit-transaction.component.css']
})
export class AddEditTransactionComponent implements OnInit {
  transactionList$!: Observable<Transaction[]>;
  transactionTypesList$!: Observable<Type[]>;
  transactionCategoriesList$!: Observable<Category[]>;
  
  constructor(private service: TransactionDataService, private currencyPipe: CurrencyPipe) { }
  
  @Input() transaction!:Transaction;
  @Input() modalTitle:string="";
  
  ngOnInit(): void {
    this.transactionList$ = this.service.getTransactionList();
    this.transactionTypesList$ = this.service.getTransactionTypesList();
    this.transactionCategoriesList$ = this.service.getTransactionCategoriesList();
  }
  
  addTransaction() {
    this.service.addTransaction(this.transaction).subscribe(res => {
      var closeModalBtn = document.getElementById('add-edit-modal-close');
      if(closeModalBtn) {
        closeModalBtn.click();
      }
    })
  }
  updateTransaction() {
    this.service.updateTransaction(this.transaction.id, this.transaction).subscribe(res => {
      var closeModalBtn = document.getElementById('add-edit-modal-close');
      if(closeModalBtn) {
        closeModalBtn.click();
      }
    })
  }

  convertToUSD(element: any) {
    element.target.value = this.currencyPipe.transform(this.transaction.transactionAmount, 'USD', 'symbol', '1.2-2');
  }
}
