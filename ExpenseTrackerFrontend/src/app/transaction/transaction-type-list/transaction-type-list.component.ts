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

  type: Type = {
    id: 0,
    type: ''
  }
  modalTitle: string = '';

  constructor(private service: TransactionDataService) { }

  ngOnInit(): void {
    this.transactionTypesList$ = this.service.getTransactionTypesList();
  }

  addModal() {
    this.type = {
      id: 0,
      type: ''
    }
    this.modalTitle = "Add Type";
  }
  deleteModal(type: Type) {
    if(confirm('Are you sure you want to delete this type?')) {
      this.service.deleteTransactionCategories(type.id).subscribe(res => {
        this.transactionTypesList$ = this.service.getTransactionCategoriesList();
      });
      window.location.reload();
    }
  }
}
