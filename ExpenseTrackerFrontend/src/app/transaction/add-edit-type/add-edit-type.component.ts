import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Type } from 'src/app/models/transaction-type.model';
import { TransactionDataService } from 'src/app/transaction-data.service';

@Component({
  selector: 'app-add-edit-type',
  templateUrl: './add-edit-type.component.html',
  styleUrls: ['./add-edit-type.component.css']
})
export class AddEditTypeComponent implements OnInit {
  typeList$!: Observable<Type[]>;

  constructor(public service: TransactionDataService) { }

  @Input() type!: Type;
  @Input() modalTitle: string = "";

  ngOnInit(): void {
    this.typeList$ = this.service.getTransactionTypesList();
  }
  addType() {
    this.service.addTransactionTypes(this.type).subscribe(res => {

    });
    window.location.reload();
  }
}
