import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from 'src/app/models/transaction-category.model';
import { TransactionDataService } from 'src/app/transaction-data.service';

@Component({
  selector: 'app-add-edit-category',
  templateUrl: './add-edit-category.component.html',
  styleUrls: ['./add-edit-category.component.css']
})
export class AddEditCategoryComponent implements OnInit {
  categoryList$!: Observable<Category[]>;
  
  constructor(public service: TransactionDataService) { }

  @Input() category!: Category;
  @Input() modalTitle: string = "";

  ngOnInit(): void {
    this.categoryList$ = this.service.getTransactionCategoriesList();
  }
  addCategory() {
    this.service.addTransactionCategories(this.category).subscribe(res => {

    });
    window.location.reload();
  }
}
